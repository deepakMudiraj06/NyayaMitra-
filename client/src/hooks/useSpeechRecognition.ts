import { useEffect, useRef, useState } from "react";

type SpeechRecognitionAlternativeLike = {
  transcript: string;
};

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
};

type SpeechRecognitionResultListLike = {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
};

type SpeechRecognitionResultEventLike = Event & {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
};

type SpeechRecognitionErrorEventLike = Event & {
  error: string;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function getRecognitionConstructor() {
  if (typeof window === "undefined") return undefined;

  return window.SpeechRecognition ?? window.webkitSpeechRecognition;
}

function getErrorMessage(error: string) {
  switch (error) {
    case "not-allowed":
    case "service-not-allowed":
      return "Microphone permission was denied. You can still type your question.";
    case "no-speech":
      return "No speech was detected. Please try again.";
    case "audio-capture":
      return "No microphone was found. You can still type your question.";
    case "network":
      return "Speech recognition is unavailable right now. Please try again or type your question.";
    default:
      return "Speech recognition stopped unexpectedly. Please try again or type your question.";
  }
}

export function useSpeechRecognition(
  language: string,
  onTranscript: (transcript: string) => void,
) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [isSupported] = useState(() => Boolean(getRecognitionConstructor()));
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const isListeningRef = useRef(false);
  const stopRequestedRef = useRef(false);
  const hasResultRef = useRef(false);
  const hadErrorRef = useRef(false);

  const stop = () => {
    if (!recognitionRef.current || !isListeningRef.current) return;

    stopRequestedRef.current = true;

    try {
      recognitionRef.current.stop();
    } catch {
      isListeningRef.current = false;
      setIsListening(false);
      recognitionRef.current = null;
    }
  };

  const start = () => {
    const Recognition = getRecognitionConstructor();

    if (!Recognition) {
      setError("Speech recognition is not supported in this browser. You can still type your question.");
      return;
    }

    if (isListeningRef.current) return;

    const recognition = new Recognition();
    recognition.lang = language;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    stopRequestedRef.current = false;
    hasResultRef.current = false;
    hadErrorRef.current = false;
    setError(null);
    setTranscript("");
    onTranscript("");

    recognition.onresult = (event) => {
      const resultParts: string[] = [];

      for (let index = 0; index < event.results.length; index += 1) {
        resultParts.push(event.results[index][0].transcript);
      }

      const nextTranscript = resultParts
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      if (nextTranscript) {
        hasResultRef.current = true;
        setTranscript(nextTranscript);
        onTranscript(nextTranscript);
      }
    };

    recognition.onerror = (event) => {
      hadErrorRef.current = true;

      if (!stopRequestedRef.current) {
        setError(getErrorMessage(event.error));
      }
    };

    recognition.onstart = () => {
      isListeningRef.current = true;
      setIsListening(true);
    };

    recognition.onend = () => {
      if (
        !stopRequestedRef.current &&
        !hasResultRef.current &&
        !hadErrorRef.current
      ) {
        setError("No speech was detected. Please try again.");
      }

      isListeningRef.current = false;
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    isListeningRef.current = true;
    setIsListening(true);

    try {
      recognition.start();
    } catch {
      isListeningRef.current = false;
      setIsListening(false);
      recognitionRef.current = null;
      setError("Could not start the microphone. Please try again or type your question.");
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        stopRequestedRef.current = true;

        try {
          recognitionRef.current.stop();
        } catch {
          // Recognition may already have ended between renders and cleanup.
        }
      }
    };
  }, []);

  return {
    error,
    isListening,
    isSupported,
    start,
    stop,
    transcript,
  };
}
