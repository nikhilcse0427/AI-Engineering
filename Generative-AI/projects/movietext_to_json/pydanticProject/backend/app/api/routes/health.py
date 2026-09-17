from fastapi import APIRouter

from app.core.config import get_settings

router = APIRouter(tags=["Health"])


@router.get("/")
def root():
    settings = get_settings()
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "status": "ok",
        "docs": "/docs",
        "health": "/health",
    }


@router.get("/health")
def health():
    return {"status": "ok"}
