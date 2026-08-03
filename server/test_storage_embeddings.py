import numpy as np

from app.services.storage_service import StorageService

storage = StorageService()

embeddings = np.random.rand(
    5,
    384
).astype("float32")

storage.save_embeddings(
    embeddings
)

loaded = storage.load_embeddings()

print(loaded.shape)