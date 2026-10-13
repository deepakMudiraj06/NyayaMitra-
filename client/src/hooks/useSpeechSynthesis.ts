import { useEffect, useRef, useState } from "react";

const LANGUAGE_NAMES: Record<string, string> = {
  "en-IN": "English (India)",
  "te-IN": "Telugu",
  "hi-IN": "Hindi",
  "kn-IN": "Kannada",
  "ta-IN": "Tamil",
};

function normalizeSpeechText(message: string) {
  return message
    .replace(/\\n/g, "\n")
    .replace(/```[\s\S]*?```/g, (codeBlock) => codeBlock.replace(/```/g, ""))
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
    .replace(/^\s*\[[^\]]+\]:\s*https?:\/\/\S+\s*$/gm, "")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*(?:[-*+]\s+|\d+[.)]\s+)/gm, "")
    .replace(/(`{1,3})(.*?)\1/g, "$2")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/([*_])(.*?)\1/g, "$2")
    .replace(/\|/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeLocale(language: string) {
  return language.trim().toLowerCase().replace(/_/g, "-");
}

function findVoice(voices: SpeechSynthesisVoice[], language: string) {
  const requestedLanguage = normalizeLocale(language);
  const languagePrefix = requestedLanguage.split("-")[0];
  const exactLanguageVoice = voices.find(
    (voice) => normalizeLocale(voice.lang) === requestedLanguage,
  );
  const languageOnlyVoice = voices.find(
    (voice) => normalizeLocale(voice.lang) === languagePrefix,
  );
  const regionalLanguageVoice = voices.find(
    (voice) => normalizeLocale(voice.lang).split("-")[0] === languagePrefix,
  );

  return exactLanguageVoice ?? languageOnlyVoice ?? regionalLanguageVoice;
}

export function useSpeechSynthesis(language: string) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voicesReady, setVoicesReady] = useState(false);
  const [isSupported] = useState(
    () =>
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      "SpeechSynthesisUtterance" in window,
  );
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const voicesReadyRef = useRef(false);
  const pendingMessageRef = useRef<string | null>(null);
  const speakRef = useRef<(message: string) => void>(() => undefined);

  const getMissingVoiceMessage = () => {
    const languageName = LANGUAGE_NAMES[language] ?? language;

    return `No ${languageName} voice is installed for ${language}. You can read the answer on screen.`;
  };

  const speak = (message: string) => {
    if (!isSupported) {
      setError("Speech playback is not supported in this browser. You can read the answer on screen.");
      return;
    }

    const speechText = normalizeSpeechText(message);

    if (!speechText) {
      setError("There is no readable text in this answer.");
      return;
    }

    const availableVoices = voicesRef.current.length
      ? voicesRef.current
      : window.speechSynthesis.getVoices();

    voicesRef.current = availableVoices;

    if (!voicesReadyRef.current && availableVoices.length === 0) {
      pendingMessageRef.current = message;
      setError("Loading available speech voices...");
      return;
    }

    const voice = findVoice(availableVoices, language);

    if (!voice) {
      setError(getMissingVoiceMessage());
      return;
    }

    const synthesis = window.speechSynthesis;
    synthesis.cancel();
    pendingMessageRef.current = null;
    setError(null);
    setHasSpoken(true);

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = language;
    utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      if (utteranceRef.current === utterance) {
        utteranceRef.current = null;
        setIsSpeaking(false);
      }
    };
    utterance.onerror = (event) => {
      if (utteranceRef.current !== utterance) return;

      utteranceRef.current = null;
      setIsSpeaking(false);

      if (event.error === "canceled") return;

      setError("Speech playback could not start. You can read the answer on screen.");
    };

    utteranceRef.current = utterance;
    setIsSpeaking(true);
    synthesis.speak(utterance);
  };

  useEffect(() => {
    speakRef.current = speak;
  });

  useEffect(() => {
    if (!isSupported) return undefined;

    const synthesis = window.speechSynthesis;

    const updateVoices = () => {
      const availableVoices = synthesis.getVoices();

      voicesRef.current = availableVoices;
      setVoices(availableVoices);

      if (availableVoices.length > 0) {
        voicesReadyRef.current = true;
        setVoicesReady(true);

        if (pendingMessageRef.current) {
          const pendingMessage = pendingMessageRef.current;
          pendingMessageRef.current = null;
          speakRef.current(pendingMessage);
        }
      }
    };

    updateVoices();
    synthesis.addEventListener("voiceschanged", updateVoices);

    const voiceLoadTimeout = window.setTimeout(() => {
      if (!voicesRef.current.length) {
        voicesReadyRef.current = true;
        setVoicesReady(true);

        if (pendingMessageRef.current) {
          const pendingMessage = pendingMessageRef.current;
          pendingMessageRef.current = null;
          speakRef.current(pendingMessage);
        }
      }
    }, 1000);

    return () => {
      window.clearTimeout(voiceLoadTimeout);

      synthesis.removeEventListener("voiceschanged", updateVoices);
      pendingMessageRef.current = null;

      if (utteranceRef.current) {
        synthesis.cancel();
        utteranceRef.current = null;
      }

      voicesReadyRef.current = false;
      setVoicesReady(false);
      setIsSpeaking(false);
    };
  }, [isSupported, language]);

  const stop = () => {
    if (!isSupported) return;

    pendingMessageRef.current = null;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsSpeaking(false);
  };

  return {
    error,
    hasSpoken,
    isSpeaking,
    isSupported,
    voices,
    voicesReady,
    speak,
    stop,
  };
}
