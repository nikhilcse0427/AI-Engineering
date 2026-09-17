from typing import List, Literal

from pydantic import BaseModel, Field


class Movie(BaseModel):
    """Validated structured movie schema returned by the extractor."""

    movie_title: str = Field(description="Movie title")
    movie_genre: List[str] = Field(description="List of movie genres")
    year: int = Field(description="Release year")
    actors: List[str] = Field(description="List of actors")
    success: Literal["flop", "hit", "blockbuster"] = Field(
        description="Choose only one: flop, hit, blockbuster"
    )
    director: str = Field(description="Movie director")
    rating: float = Field(description="Movie rating out of 5")
    summary: str = Field(description="Brief summary of the movie")
