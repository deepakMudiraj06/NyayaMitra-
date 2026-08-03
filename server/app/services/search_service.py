def search_chunks(question, chunks):
    """
    Search for the most relevant chunk using keyword matching.
    """

    question = question.lower()
    question_words = question.split()

    best_chunk = ""
    best_score = 0

    for chunk in chunks:
        score = 0
        chunk_lower = chunk.lower()

        for word in question_words:
            if word in chunk_lower:
                score += 1

        if score > best_score:
            best_score = score
            best_chunk = chunk

    return best_chunk