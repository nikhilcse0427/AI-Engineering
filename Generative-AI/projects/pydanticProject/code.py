import os
from typing import List, Literal

from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from pydantic import BaseModel, Field

load_dotenv()

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from typing import List, Literal
from langchain_core.output_parsers import PydanticOutputParser

model = ChatGroq(
    model="qwen/qwen3-32b",
    temperature=0,
    reasoning_format="parsed",
    max_retries=2,
)

class Movie(BaseModel):
    movie_title: str = Field(description="movie title")
    movie_genre: List[str] = Field(description="list of genre movie follows")
    year: str = Field(description="release date of movie")
    actors: List[str] = Field(description="list of all the actors")
    success: Literal["flop", "hit", "blockbuster"] = Field(description="select one from literals")
    director: str = Field(description="movie director")
    rating: int = Field(description="rating of movie out of 5 star")
    summary: str = Field(description="brief summary of movie")

parser = PydanticOutputParser(pydantic_object=Movie)   # fix 1

prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an expert at converting unstructured text into clean, structured JSON.

{movie_format}"""),                                     # fix 3: placeholder add kiya
    ("human", "Convert this text into JSON:\n\n{user_text}")   # fix 2: consistent naming
])

user_text = input("Enter the string: ")

final_prompt = prompt.invoke({
    "movie_format": parser.get_format_instructions(),   # fix 2: matching keys
    "user_text": user_text
})

response = model.invoke(final_prompt)

parsed_movie = parser.parse(response.content)   # fix 4: actually parse karo

print("\nParsed Movie Object:")
print(parsed_movie)
print("\nAs dict:")
print(parsed_movie.model_dump())