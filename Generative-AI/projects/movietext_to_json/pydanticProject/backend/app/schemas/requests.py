from pydantic import BaseModel, Field


class ParseMovieRequest(BaseModel):
    """Request body for movie description extraction."""

    text: str = Field(
        ...,
        min_length=10,
        description="Unstructured movie description",
        examples=[
            "Inception (2010), directed by Christopher Nolan, is a sci-fi thriller "
            "starring Leonardo DiCaprio. It was a blockbuster with about 4.5/5 ratings."
        ],
    )
