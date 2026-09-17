import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate
import numpy as np


# ==============================
# Environment Configuration
# ==============================

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("LLM api does not exist.")


# ==============================
# LLM Configuration
# ==============================

llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="openai/gpt-oss-20b",
    temperature=0,
)


# ==============================
# Embedding Model
# ==============================

embeddings_model = HuggingFaceEmbeddings(
    model_name="intfloat/e5-large-v2",
    encode_kwargs={"prompt": "passage: "},
    query_encode_kwargs={"prompt": "query: "},
)


# ==============================
# Cosine Similarity
# ==============================

def cosine_similarity(vec1, vec2):

    dot = np.dot(vec1, vec2)

    return dot / (
        np.linalg.norm(vec1) *
        np.linalg.norm(vec2)
    )


# ==============================
# Documents
# ==============================

documents = [

    "Employees receive 24 days of paid leave per year.",

    "Employees work from the office on Tuesday, Wednesday and Thursday. "
    "Monday and Friday are optional work-from-home days.",

    "Employees receive Rs 3000 per month for gym reimbursement.",

    "Employees can claim Rs 2000 per month for home internet.",

    "Employees have a 90 day notice period."
]


# ==============================
# Create Document Embeddings
# ==============================

document_embeddings = []

for doc in documents:

    embedded_text = embeddings_model.embed_query(doc)

    document_embeddings.append(embedded_text)


# ==============================
# Retrieval
# ==============================

def retrieve(query_embedding):

    scores = []

    for i, doc_embedding in enumerate(document_embeddings):

        score = cosine_similarity(
            query_embedding,
            doc_embedding
        )

        scores.append(
            (score, documents[i])
        )

    scores.sort(reverse=True)

    return scores[0]


# ==============================
# Ask LLM
# ==============================

def ask_llm(query, context):

    prompt = ChatPromptTemplate.from_messages([

        (
            "system",
            """Answer in one line only.
Answer only based on this context.
Do not hallucinate.

Context:
{context}"""
        ),

        (
            "human",
            "{question}"
        )
    ])

    messages = prompt.invoke({
        "context": context,
        "question": query
    })

    response = llm.invoke(messages)

    return response.content


# ==============================
# User Query
# ==============================
def askQuery():
  if True:
    query = input("Enter your query: ")
    print("Query:", query)
    embedded_query = embeddings_model.embed_query(query)
    score, context = retrieve(embedded_query)
    print("Similarity Score:", score)
    print("Retrieved Context:", context)
    answer = ask_llm(query, context)
    print("Answer:", answer)
    askQuery()
    
askQuery()