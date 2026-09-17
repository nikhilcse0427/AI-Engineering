import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

print("API key found:", api_key is not None)

llm = ChatGroq(
    api_key=api_key,
    model="openai/gpt-oss-20b"
)

print("Starting...")

for chunk in llm.stream("Write story in 200 words"):
    print(chunk.content, end="", flush=True)
