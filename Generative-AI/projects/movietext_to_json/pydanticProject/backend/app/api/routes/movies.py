from fastapi import APIRouter, HTTPException

from app.models.movie import Movie
from app.schemas.requests import ParseMovieRequest
from app.services.movie_extractor import movie_extractor

router = APIRouter(tags=["Movies"])


@router.post("/parse", response_model=Movie)
def parse_movie(body: ParseMovieRequest):
    """Convert an unstructured movie description into a validated Movie schema."""
    try:
        return movie_extractor.parse(body.text.strip())
    except Exception as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
