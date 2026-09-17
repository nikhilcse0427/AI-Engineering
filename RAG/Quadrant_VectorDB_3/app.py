import os
import numpy as np

from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate

from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct


# ============================================================
# 1. Environment Configuration
# ============================================================

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY does not exist in .env")

if not QDRANT_API_KEY:
    raise ValueError("QDRANT_API_KEY does not exist in .env")

if not QDRANT_URL:
    raise ValueError("QDRANT_URL does not exist in .env")


# ============================================================
# 2. LLM Configuration
# ============================================================

llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="openai/gpt-oss-20b",
    temperature=0
)


# ============================================================
# 3. Connect to Qdrant Cloud
# ============================================================

client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)

print("Connected to Qdrant Cloud")


# ============================================================
# 4. Embedding Model
# ============================================================

embeddings_model = HuggingFaceEmbeddings(
    model_name="intfloat/e5-large-v2"
)

# e5-large-v2 produces 1024-dimensional vectors
VECTOR_SIZE = 1024

COLLECTION_NAME = "RAG_DOC"


# ============================================================
# 5. Load knowledge.txt
# ============================================================

try:

    with open("knowledge.txt", "r", encoding="utf-8") as file:
        text = file.read()

except FileNotFoundError:

    raise FileNotFoundError(
        "knowledge.txt file nahi mili. "
        "Make sure knowledge.txt is in the same folder as main.py"
    )


if not text.strip():
    raise ValueError("knowledge.txt is empty.")


print("knowledge.txt loaded successfully!")
print("Total characters:", len(text))


# ============================================================
# 6. Split Text into Chunks
# ============================================================

chunk_size = 500
chunk_overlap = 50

documents = []

start = 0

while start < len(text):

    end = start + chunk_size

    chunk = text[start:end].strip()

    if chunk:
        documents.append(chunk)

    start += chunk_size - chunk_overlap


print("Total chunks created:", len(documents))


# ============================================================
# 7. Create Qdrant Collection
# ============================================================

if not client.collection_exists(COLLECTION_NAME):

    client.create_collection(
        collection_name=COLLECTION_NAME,

        vectors_config=VectorParams(
            size=VECTOR_SIZE,
            distance=Distance.COSINE
        )
    )

    print("Qdrant collection created:", COLLECTION_NAME)

else:

    print("Qdrant collection already exists:", COLLECTION_NAME)


# ============================================================
# 8. Create Document Embeddings
# ============================================================

print("\nCreating embeddings...")

document_embeddings = []

for i, doc in enumerate(documents):

    embedding = embeddings_model.embed_query(
        "passage: " + doc
    )

    document_embeddings.append(embedding)

    print(f"Embedded chunk {i + 1}/{len(documents)}")


# ============================================================
# 9. Upload Embeddings to Qdrant
# ============================================================

print("\nUploading documents to Qdrant...")

points = []

for i, embedding in enumerate(document_embeddings):

    point = PointStruct(

        id=i + 1,

        vector=embedding,

        payload={
            "text": documents[i]
        }
    )

    points.append(point)


client.upsert(

    collection_name=COLLECTION_NAME,

    points=points
)


print(
    f"Uploaded {len(points)} chunks to Qdrant successfully!"
)


# ============================================================
# 10. Cosine Similarity
# ============================================================

def cosine_similarity(vec1, vec2):

    dot_product = np.dot(vec1, vec2)

    denominator = (
        np.linalg.norm(vec1)
        *
        np.linalg.norm(vec2)
    )

    if denominator == 0:
        return 0

    return dot_product / denominator


# ============================================================
# 11. Retrieval
# ============================================================

def retrieve(query):

    # Create query embedding
    query_embedding = embeddings_model.embed_query(
        "query: " + query
    )

    # Search Qdrant
    results = client.query_points(

        collection_name=COLLECTION_NAME,

        query=query_embedding,

        limit=3,

        with_payload=True
    )

    return results.points


# ============================================================
# 12. Ask LLM
# ============================================================

def ask_llm(query, context):

    prompt = ChatPromptTemplate.from_messages([

        (
            "system",

            """
You are a helpful RAG assistant.

Answer the user's question using ONLY the provided context.

Do not use outside knowledge.

Do not hallucinate.

If the answer is not present in the context,
say: "I don't know based on the provided knowledge."

Keep the answer concise.

Context:
{context}
"""
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


# ============================================================
# 13. User Query
# ============================================================

def ask_query():

    while True:

        print("\n" + "=" * 60)

        query = input(
            "Enter your query (type 'exit' to quit): "
        )


        # Exit
        if query.lower() == "exit":
            print("Exiting...")
            break


        if not query.strip():
            print("Please enter a query.")
            continue


        print("\nQuery:", query)


        # ====================================================
        # Retrieval
        # ====================================================

        results = retrieve(query)


        if not results:

            print("No relevant documents found.")

            continue


        # ====================================================
        # Display Retrieved Documents
        # ====================================================

        context_parts = []

        print("\nRetrieved Documents:")

        for i, result in enumerate(results):

            text = result.payload.get(
                "text",
                ""
            )

            score = result.score

            print("\n----------------------------------------")

            print(
                f"Document {i + 1}"
            )

            print(
                f"Similarity Score: {score:.4f}"
            )

            print(
                f"Text: {text}"
            )


            context_parts.append(text)


        # ====================================================
        # Combine Context
        # ====================================================

        context = "\n\n".join(
            context_parts
        )


        # ====================================================
        # Ask LLM
        # ====================================================

        answer = ask_llm(
            query,
            context
        )


        # ====================================================
        # Final Answer
        # ====================================================

        print("\n" + "=" * 60)

        print("Answer:")

        print(answer)

        print("=" * 60)


# ============================================================
# 14. Start Application
# ============================================================

if __name__ == "__main__":

    ask_query()