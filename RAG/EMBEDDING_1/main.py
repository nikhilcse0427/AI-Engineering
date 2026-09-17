from sentence_transformers import SentenceTransformer
import numpy as np

def cosine_similarity(vec1, vec2):
    return np.dot(vec1, vec2) / (
        np.linalg.norm(vec1) * np.linalg.norm(vec2)
    )

sentences1= "Virat Kohli is Indian Crciketer."
sentences2= "Virat Kohli Plays for Indian cricket team."


model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

embeddings1 = model.encode(sentences1)
embeddings2 = model.encode(sentences2)




print(cosine_similarity(embeddings1, embeddings2))
