class HistoryAwareRetriever:
    """
    Converts follow-up questions into standalone questions
    using recent conversation history.
    """

    def rewrite_question(self, question, history):

        # No history → use the original question
        if not history:
            return question

        # Get the last user question
        previous_user = None

        for message in reversed(history):
            if message["role"] == "user":
                previous_user = message["content"]
                break

        if previous_user is None:
            return question

        follow_up_words = [
            "it",
            "this",
            "that",
            "they",
            "them",
            "he",
            "she",
            "punishment",
            "penalty",
            "fine",
            "offence",
            "offense",
            "section",
            "law",
            "age",
            "licence",
            "license"
        ]

        lower_question = question.lower()

        # If the current question appears to be a follow-up,
        # combine it with the previous user message.
        if any(word in lower_question for word in follow_up_words):
            return f"{previous_user}. {question}"

        return question