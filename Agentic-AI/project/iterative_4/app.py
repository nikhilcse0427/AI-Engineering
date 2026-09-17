import os
from typing import TypedDict, Annotated

from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_tavily import TavilySearch

from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode


load_dotenv()


# ============================================================
# API KEYS
# ============================================================

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")


# ============================================================
# LLM
# ============================================================

llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="openai/gpt-oss-120b",
    temperature=1.0
)


# ============================================================
# TAVILY TOOL
# ============================================================

tool = TavilySearch(
    api_key=TAVILY_API_KEY,
    max_results=5,
    topic="general",
)

tools = [tool]

llm_with_tools = llm.bind_tools(tools)


# ============================================================
# STATE
# ============================================================

class State(TypedDict):
    topic: str
    attempt: int
    messages: Annotated[list, add_messages]
    reviewer_feedback: str
    is_approved: bool
    draft: str


# ============================================================
# WRITER PROMPT
# ============================================================

content_writer_prompt = """
You are an expert LinkedIn content writer.

Your job is to write a high-engagement LinkedIn post based on the
given topic.

Guidelines:

- Start with a strong hook line.
- Hook should be no more than 12 words.
- Write in short paragraphs of 1-3 lines.
- Use a conversational first-person professional tone.
- Include one concrete example, data point, or useful insight.
- End with a clear call-to-action.
- Add 3-5 relevant hashtags.
- Keep total length between 900-1300 characters.
- Do not use emojis excessively. Maximum 2-3.
- Do not sound like an advertisement.
- Do not sound like generic AI-generated content.
- Output only the LinkedIn post.
"""


# ============================================================
# WRITER NODE
# ============================================================

def writer_node(state: State):

    topic = state["topic"]

    attempt = state.get("attempt", 0) + 1

    previous_feedback = state.get(
        "reviewer_feedback",
        ""
    )

    # --------------------------------------------------------
    # First attempt
    # --------------------------------------------------------

    if attempt == 1:

        user_message = f"""
Write a LinkedIn post about this topic:

{topic}

If the topic requires current information,
use the web search tool first.

Output ONLY the final LinkedIn post.
"""

    # --------------------------------------------------------
    # Retry attempt
    # --------------------------------------------------------

    else:

        user_message = f"""
Your previous LinkedIn draft was rejected.

Topic:
{topic}

Reviewer feedback:
{previous_feedback}

Create a new improved draft.

Requirements:

- Fix every issue mentioned in the feedback.
- Keep the same core topic.
- Improve clarity and value.
- Do not repeat the previous mistakes.
- Follow all LinkedIn writing guidelines.

Output ONLY the revised LinkedIn post.
"""

    messages = [
        ("system", content_writer_prompt),
        ("human", user_message)
    ]

    response = llm_with_tools.invoke(messages)

    return {
        "messages": [
            ("human", user_message),
            response
        ],
        "attempt": attempt
    }


# ============================================================
# TOOL NODE
# ============================================================

tool_node = ToolNode(tools)


# ============================================================
# EXTRACT DRAFT NODE
# ============================================================

def extract_draft_node(state: State):

    last_message = state["messages"][-1]

    draft = last_message.content

    return {
        "draft": draft
    }


# ============================================================
# ROUTE AFTER WRITER
# ============================================================

def should_use_tool(state: State):

    last_message = state["messages"][-1]

    if getattr(last_message, "tool_calls", None):
        return "tools"

    return "extract_draft"


# ============================================================
# REVIEWER PROMPT
# ============================================================

content_reviewer_prompt = """
You are a strict LinkedIn content reviewer.

Review the LinkedIn post against:

1. Hook Strength
2. Clarity
3. Tone
4. Value/Insight
5. Call-to-Action
6. Length
7. Hashtag Relevance

Give a score from 1-10 for every parameter.

Then decide whether the post should be approved.

Return ONLY JSON in this exact format:

{
    "approved": true,
    "feedback": "Overall feedback here..."
}

Set approved to true only if the post is good enough to publish.

If it needs improvement, set approved to false and clearly explain
what needs to be fixed.
"""


# ============================================================
# REVIEWER NODE
# ============================================================

def reviewer_node(state: State):

    draft = state["draft"]

    prompt = f"""
Review this LinkedIn post:

-------------------------
{draft}
-------------------------

{content_reviewer_prompt}
"""

    response = llm.invoke(
        [
            ("system", content_reviewer_prompt),
            ("human", prompt)
        ]
    )

    review_text = response.content.strip()

    print("\n========== REVIEW ==========")
    print(review_text)

    # --------------------------------------------------------
    # Simple approval detection
    # --------------------------------------------------------

    is_approved = '"approved": true' in review_text.lower()

    return {
        "reviewer_feedback": review_text,
        "is_approved": is_approved
    }


# ============================================================
# LOOP / STOP CONDITION
# ============================================================

def should_stop_looping(state: State):

    if state["is_approved"]:

        print("\nPost has been APPROVED.")

        return END

    if state["attempt"] >= 3:

        print("\nReached maximum attempts.")

        return END

    print("\nPost REJECTED. Sending back to writer...")

    return "writer"


# ============================================================
# BUILD GRAPH
# ============================================================

graph = StateGraph(State)


graph.add_node(
    "writer",
    writer_node
)

graph.add_node(
    "tools",
    tool_node
)

graph.add_node(
    "extract_draft",
    extract_draft_node
)

graph.add_node(
    "reviewer",
    reviewer_node
)


# ============================================================
# EDGES
# ============================================================

graph.add_edge(
    START,
    "writer"
)


graph.add_conditional_edges(
    "writer",
    should_use_tool,
    {
        "tools": "tools",
        "extract_draft": "extract_draft"
    }
)


graph.add_edge(
    "tools",
    "writer"
)


graph.add_edge(
    "extract_draft",
    "reviewer"
)


graph.add_conditional_edges(
    "reviewer",
    should_stop_looping,
    {
        "writer": "writer",
        END: END
    }
)


# ============================================================
# COMPILE
# ============================================================

app = graph.compile()


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    topic = "AI"

    initial_state = {
        "topic": topic,
        "attempt": 0,
        "messages": [],
        "reviewer_feedback": "",
        "is_approved": False,
        "draft": ""
    }

    result = app.invoke(initial_state)

    print("\n\n================================")
    print("FINAL LINKEDIN POST")
    print("================================\n")

    print(result["draft"])

    print("\n\n================================")
    print("FINAL REVIEW")
    print("================================\n")

    print(result["reviewer_feedback"])
        