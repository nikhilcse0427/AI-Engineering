"""CLI helper for local testing without the HTTP server."""

from app.services.movie_extractor import movie_extractor


def main() -> None:
    user_text = input("Enter movie description:\n")

    try:
        parsed_movie = movie_extractor.parse(user_text)
        print("\nParsed Movie Object:\n")
        print(parsed_movie)
        print("\nDictionary Output:\n")
        print(parsed_movie.model_dump())
    except Exception as exc:
        print("\nParsing Error:")
        print(exc)


if __name__ == "__main__":
    main()
