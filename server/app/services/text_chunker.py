def split_into_chunks(text, chunk_size=1000):
    """
    Splits text into chunks of approximately chunk_size characters.
    """

    chunks = []

    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])

    return chunks