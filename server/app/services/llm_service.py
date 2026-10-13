from pathlib import Path
import os

from dotenv import load_dotenv
from google import genai


SERVER_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = SERVER_DIR / ".env"
load_dotenv(dotenv_path=ENV_FILE, override=False)


class LLMService:

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        self.model = os.getenv("GEMINI_MODEL")

        if not api_key:
            raise RuntimeError("GEMINI_API_KEY is not configured.")

        if not self.model:
            raise RuntimeError("GEMINI_MODEL is not configured.")

        try:
            self.client = genai.Client(api_key=api_key)
        except Exception as exc:
            raise RuntimeError(
                f"Gemini client initialization failed ({type(exc).__name__})."
            ) from None

    def generate(self, prompt):
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
            )
        except Exception as exc:
            raise RuntimeError(
                f"Gemini generation failed ({type(exc).__name__})."
            ) from None

        answer = getattr(response, "text", None)

        if not isinstance(answer, str) or not answer.strip():
            raise RuntimeError("Gemini returned an empty response.")

        return answer
