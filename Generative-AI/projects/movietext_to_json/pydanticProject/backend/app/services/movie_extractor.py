import re
from typing import Optional

from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

from app.core.config import get_settings
from app.models.movie import Movie


class MovieExtractorService:
    """Extracts a validated Movie schema from free-form text using Groq + Pydantic."""

    def __init__(self) -> None:
        self._settings = get_settings()
        self._parser = PydanticOutputParser(pydantic_object=Movie)
        self._prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """You are an expert at converting unstructured movie descriptions into structured JSON.

Return ONLY a JSON object.
Do not include markdown.
Do not include explanations.
Do not include thinking, reasoning, or <think> tags.

{format_instructions}
""",
                ),
                (
                    "human",
                    "Convert the following movie description into JSON:\n\n{user_text}",
                ),
            ]
        )
        self._model: Optional[ChatGroq] = None

    def _get_model(self) -> ChatGroq:
        if self._model is None:
            if not self._settings.groq_api_key:
                raise RuntimeError(
                    "GROQ_API_KEY is missing. Add it to backend/.env or environment variables."
                )
            self._model = ChatGroq(
                api_key=self._settings.groq_api_key,
                model=self._settings.groq_model,
                temperature=0,
                max_tokens=None,
                timeout=None,
                max_retries=2,
                reasoning_format="hidden",
                reasoning_effort="none",
            )
        return self._model

    @staticmethod
    def _extract_json(content: str) -> str:
        """Strip reasoning tags / markdown and pull out the first JSON object."""
        cleaned = re.sub(
            r"<think>.*?</think>",
            "",
            content,
            flags=re.DOTALL | re.IGNORECASE,
        )
        cleaned = cleaned.strip()

        if cleaned.startswith("```"):
            cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
            cleaned = re.sub(r"\s*```$", "", cleaned)
            cleaned = cleaned.strip()

        if cleaned.startswith("{") and cleaned.endswith("}"):
            return cleaned

        match = re.search(r"\{.*\}", cleaned, flags=re.DOTALL)
        if match:
            return match.group(0)
        return cleaned

    def parse(self, user_text: str) -> Movie:
        final_prompt = self._prompt.invoke(
            {
                "format_instructions": self._parser.get_format_instructions(),
                "user_text": user_text,
            }
        )
        response = self._get_model().invoke(final_prompt)
        content = (
            response.content
            if isinstance(response.content, str)
            else str(response.content)
        )
        return self._parser.parse(self._extract_json(content))


movie_extractor = MovieExtractorService()
