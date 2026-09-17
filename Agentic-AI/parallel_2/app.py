import os
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ API key not found")

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    api_key=GROQ_API_KEY,
    temperature=0
)

raw_text = """
Hey guys! Welcome back to the stream. Today we are going to discuss
cybersecurity and online safety. Some people are idiots for ignoring
basic security practices, and their careless behavior can put everyone
at risk. We should improve our security habits and protect our systems.
"""


def merge_score_dicts(existing: dict, updated: dict) -> dict:
    if existing is None:
        return updated

    return {**existing, **updated}


class AnalyzerState(TypedDict):
    raw_text: str
    safety_score: Annotated[dict[str, int], merge_score_dicts]


def toxicity_node(state: AnalyzerState):

    prompt = f"""
You are a content toxicity and hate speech analyzer.

Analyze the following text for:
- Profanity
- Aggression
- Hate speech
- Insults
- Toxic or abusive language

Give a toxicity score from 0 to 100.

0 = Completely clean and safe
100 = Extremely toxic, hateful, or abusive

Return ONLY the integer score.
Do not provide explanations.

Text:
{state['raw_text']}
"""

    response = llm.invoke(prompt)

    try:
        score = int(response.content.strip())
    except ValueError:
        score = 0

    return {
        "safety_score": {
            "toxicity": score
        }
    }


def copy_right(state: AnalyzerState):

    prompt = f"""
You are a copyright and originality risk analyzer.

Analyze the following text for:
- Signs of copied or highly unoriginal content
- Suspiciously reproduced wording
- Possible trademark or brand-related risks
- Content that appears to imitate another source

Give a copyright/originality risk score from 0 to 100.

0 = Low risk / appears original
100 = High risk / strongly appears copied or risky

Important:
You cannot verify actual plagiarism without comparing the text
against external sources. Only estimate the risk based on the text itself.

Return ONLY the integer score.
Do not provide explanations.

Text:
{state['raw_text']}
"""

    response = llm.invoke(prompt)

    try:
        score = int(response.content.strip())
    except ValueError:
        score = 0

    return {
        "safety_score": {
            "copyright_score": score
        }
    }


def sensitivity_node(state: AnalyzerState):

    prompt = f"""
You are a global cultural and religious sensitivity analyzer.

Analyze the following text for:
- Cultural insensitivity
- Religious disrespect
- Stereotypes
- Derogatory references toward cultural or religious groups
- Statements that could reasonably offend a diverse global audience
- Political or regional sensitivities

Give a sensitivity-risk score from 0 to 100.

0 = Respectful and culturally safe
100 = Highly offensive, discriminatory, or insensitive

Do not judge the text based on whether a particular culture or religion
is mentioned. Only increase the score when the wording or context creates
a meaningful risk of disrespect, stereotyping, discrimination, or offense.

Return ONLY the integer score.
Do not provide explanations.

Text:
{state['raw_text']}
"""

    response = llm.invoke(prompt)

    try:
        score = int(response.content.strip())
    except ValueError:
        score = 0

    return {
        "safety_score": {
            "cultural_sensitivity": score
        }
    }


graph = StateGraph(AnalyzerState)

graph.add_node("toxicity", toxicity_node)
graph.add_node("copyright", copy_right)
graph.add_node("sensitivity", sensitivity_node)


graph.add_edge(START, "toxicity")
graph.add_edge(START, "copyright")
graph.add_edge(START, "sensitivity")


graph.add_edge("toxicity", END)
graph.add_edge("copyright", END)
graph.add_edge("sensitivity", END)


app = graph.compile()

if __name__ == "__main__":
    initial_state = {
        "raw_text": raw_text,
        "safety_score": {}
    }

    final_state = app.invoke(initial_state)

    print(final_state["safety_score"])