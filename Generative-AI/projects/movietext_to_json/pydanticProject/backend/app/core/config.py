from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    app_name: str = "ReelSchema API"
    app_version: str = "1.0.0"
    groq_api_key: str = ""
    groq_model: str = "qwen/qwen3-32b"
    allowed_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    def cors_origins(self) -> list[str]:
        origins = [
            origin.strip()
            for origin in self.allowed_origins.split(",")
            if origin.strip()
        ]
        for local in ("http://localhost:5173", "http://127.0.0.1:5173"):
            if local not in origins:
                origins.append(local)
        return origins


@lru_cache
def get_settings() -> Settings:
    return Settings()
