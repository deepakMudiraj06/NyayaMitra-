class PromptService:
    """
    Builds the prompt for the local LLM using
    retrieved legal sections and conversation history.
    """

    def build_prompt(
        self,
        question,
        retrieved_sections,
        history=None
    ):

        context = ""

        for section in retrieved_sections:

            context += (
                f"Act: {section['act']}\n"
                f"Section: {section['section_number']}\n"
                f"Title: {section['title']}\n\n"
                f"{section['content']}\n"
                f"{'-'*80}\n"
            )

        conversation = ""

        if history:
            for msg in history:
                conversation += (
                    f"{msg['role'].capitalize()}: "
                    f"{msg['content']}\n"
                )

        prompt = f"""
You are NyayaMitra AI.

You are an expert legal assistant specializing in Indian law.

Use ONLY the legal context below.

Never invent laws.

If the answer is not available, reply:

"I couldn't find sufficient information in the uploaded legal documents."

---------------------------------

Conversation History

{conversation}

---------------------------------

Legal Context

{context}

---------------------------------

Current Question

{question}

---------------------------------

Answer in Markdown using:

# Legal Summary

## Relevant Law

## Important Points

## Conclusion

"""

        return prompt.strip()