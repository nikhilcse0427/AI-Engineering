import os
from typing import TypedDict

from dotenv import load_dotenv
from langchain_groq import ChatGroq

raw_input = ("so basically like yesterday i was going too the marcket for buy some frutes "
    "and vegtables but the shop was closed becuase of some holiday i dont no which one "
    "so i had too come back empty handed and now i am thinking what to cook for dinner "
    "tonite honestly this whole day has been kind of a wierd one for me")

class PipelineState(TypedDict):
    raw_input: str
    edited_text: str
    script_text: str
    final_text: str


# Load environment variables
load_dotenv()

GROQ_API = os.getenv("GROQ_API_KEY")

if not GROQ_API:
    raise ValueError("GROQ_API_KEY not found in .env file")


# Initialize Groq LLM
llm = ChatGroq(
    model="openai/gpt-oss-120b",
    api_key=GROQ_API,
    temperature=0.8,

)


def editor_node(state: PipelineState) -> dict:
    """Stage-1: Cleanup grammer, remove typos and redefine the tone"""
    prompt = (
        "You are an expert copyeditor. Clean up the following raw text. "
        "Fix any grammatical errors, spelling mistakes, and smooth out the transition flow "
        "while keeping the core message intact. Return only the edited text.\n\n"
        f"Text:\n{state['raw_input']}"
    )
    response = llm.invoke(prompt)
    return {"edited_text": response.content.strip()}


def ScriptWriter_node(state: PipelineState) -> dict:
    """Stage 2: Converts the edited/clean text into an engaging script format."""

    prompt = (
        "You are a professional scriptwriter. Convert the following text into "
        "an engaging, natural-sounding script suitable for narration or video content. "
        "Add appropriate pacing, tone, and structure (like hooks, transitions, and a strong closing). "
        "Keep the core message intact but make it captivating and conversational. "
        "Return only the final script.\n\n"
        f"Text:\n{state['edited_text']}"
    )
    response = llm.invoke(prompt)
    return {"script_text": response.content.strip()}


def hinglish_node(state: PipelineState) -> dict:
    """Stage 3: Converts the script into natural, conversational Hinglish."""

    prompt = (
        "You are a native Hinglish content writer. Convert the following script into "
        "natural, conversational Hinglish — a mix of Hindi and English as commonly spoken "
        "by Indian YouTubers/content creators. Use Roman script (Hindi words written in "
        "English letters), not Devanagari. Keep technical terms, brand names, and English "
        "phrases that sound natural in English (don't force-translate everything). "
        "Maintain the same tone, pacing, and structure as the original. "
        "Return only the converted script.\n\n"
        f"Script:\n{state['script_text']}"
    )
    response = llm.invoke(prompt)
    return {"final_text": response.content.strip()}


from langgraph.graph import StateGraph, START, END

graph = StateGraph(PipelineState)

graph.add_node("editor", editor_node)
graph.add_node("ScriptWritter", ScriptWriter_node)
graph.add_node("hinglish", hinglish_node)

graph.add_edge(START, "editor")
graph.add_edge("editor", "ScriptWritter")
graph.add_edge("ScriptWritter", "hinglish")
graph.add_edge("hinglish", END)

app = graph.compile()

if __name__ == "__main__":
    response = app.invoke({"raw_input": raw_input})

    print("=== EDITED TEXT ===")
    print(response["edited_text"])

    print("\n=== SCRIPT ===")
    print(response["script_text"])
    print("\n=== HINGLISH SCRIPT ===")
    print(response["final_text"])