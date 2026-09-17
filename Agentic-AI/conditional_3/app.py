import os
from typing import Annotated, TypedDict

from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_groq import ChatGroq
from langchain_qdrant import QdrantVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.graph import END, START, StateGraph
from langgraph.graph.message import add_messages
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from sentence_transformers import SentenceTransformer

load_dotenv()

LLM_API_KEY = os.getenv("GROQ_API_KEY")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")

if not LLM_API_KEY:
    raise ValueError("LLM API not found.")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
text_splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    api_key=LLM_API_KEY,
    temperature=0.4,
)

if QDRANT_URL:
    client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
else:
    client = QdrantClient(path=os.path.join(BASE_DIR, "qdrant_data"))

def build_retriever(pdf_path: str, collection_name: str):
    if not client.collection_exists(collection_name):
        client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE),
        )

    loader = PyPDFLoader(pdf_path)
    document = loader.load()
    chunks = text_splitter.split_documents(document)

    store_kwargs = {
        "documents": chunks,
        "embedding": embedding_model,
        "collection_name": collection_name,
    }
    if QDRANT_URL:
        store_kwargs["url"] = QDRANT_URL
        store_kwargs["api_key"] = QDRANT_API_KEY
    else:
        store_kwargs["path"] = os.path.join(BASE_DIR, "qdrant_data")

    vector_store = QdrantVectorStore.from_documents(**store_kwargs)
    return vector_store.as_retriever(search_kwargs={"k": 4})


academic_retriever = build_retriever(
    os.path.join(BASE_DIR, "academics_handbook.pdf"), "academic_docs"
)
fee_retriever = build_retriever(
    os.path.join(BASE_DIR, "fee_structure.pdf"), "fee_docs"
)


class State(TypedDict):
    programme: str
    messages: Annotated[list, add_messages]
    query_type: str
    retrieved_context: str


def classifier_node(state: State) -> dict:
    last_message = state["messages"][-1].content
    prompt = (
        "Classify the following student query into exactly one category: "
        "'academic', 'fee', or 'general'.\n\n"
        "Use 'academic' for questions about attendance, exams, grading, credits, "
        "promotion, course structure, summer training, or degree requirements.\n"
        "Use 'fee' for questions about tuition, payment, refund, late charges, "
        "scholarships, or any money-related topic.\n"
        "Use 'general' for greetings, casual talk, or anything not related to "
        "the college rules or fee.\n\n"
        f"Query: {last_message}\n\n"
        "Return only one word: academic, fee, or general."
    )
    response = llm.invoke(prompt)
    category = response.content.strip().lower()

    if "academic" in category:
        category = "academic"
    elif "fee" in category:
        category = "fee"
    else:
        category = "general"

    return {"query_type": category}


def academic_node(state: State) -> dict:
    query = state["messages"][-1].content.strip()
    docs = academic_retriever.invoke(query)
    context = "\n\n".join([doc.page_content for doc in docs])
    return {"retrieved_context": context}


def fee_rag_node(state: State) -> dict:
    query = state["messages"][-1].content.strip()
    docs = fee_retriever.invoke(query)
    context = "\n\n".join([doc.page_content for doc in docs])
    return {"retrieved_context": context}


def general_node(state: State) -> dict:
    return {"retrieved_context": "NO_RETRIEVAL_NEEDED"}


def response_node(state: State) -> dict:
    query = state["messages"][-1].content
    programme = state.get("programme", "Unknown")
    context = state["retrieved_context"]

    if context == "NO_RETRIEVAL_NEEDED":
        prompt = (
            f"You are a friendly college assistant talking to a {programme} student. "
            f"Answer this question using your own general knowledge:\n\n{query}"
        )
    else:
        prompt = (
            f"You are a college assistant helping a {programme} student. "
            f"Use the following context from the official college documents to answer "
            f"the question accurately. If the context mentions specific figures for "
            f"different programmes, highlight the one relevant to {programme} if possible.\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {query}\n\n"
            f"Give a clear, friendly, and precise answer."
        )

    response = llm.invoke(prompt)
    return {"messages": [("ai", response.content.strip())]}


def route_query(state: State):
    if state["query_type"] == "academic":
        return "academic_rag"
    if state["query_type"] == "fee":
        return "fee_rag"
    return "general"


graph = StateGraph(State)

graph.add_node("classifier", classifier_node)
graph.add_node("academic_rag", academic_node)
graph.add_node("fee_rag", fee_rag_node)
graph.add_node("general", general_node)
graph.add_node("response", response_node)

graph.add_edge(START, "classifier")
graph.add_conditional_edges("classifier", route_query)
graph.add_edge("academic_rag", "response")
graph.add_edge("fee_rag", "response")
graph.add_edge("general", "response")
graph.add_edge("response", END)

app = graph.compile()

if __name__ == "__main__":
    print("Welcome to the College assistant\n")
    print("Which programme are you in?")
    print("1. BCA")
    print("2. BBA")
    print("3. B.Com (H)")

    choice = input("\nEnter 1, 2 or 3: ")

    programme_map = {
        "1": "BCA",
        "2": "BBA",
        "3": "B.Com (H)",
    }
    student_programme = programme_map.get(choice, "BCA")

    print(f"\nGreat! You're set as a {student_programme} student.")

    while True:
        user_query = input("You: ")

        if user_query.lower() in ["exit", "quit"]:
            break

        result = app.invoke(
            {
                "programme": student_programme,
                "messages": [("human", user_query)],
            }
        )

        print(f"Assistant: {result['messages'][-1].content}")
