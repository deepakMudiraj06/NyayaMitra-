class PromptService:
    """
    Builds the prompt for the local LLM using
    retrieved legal sections.
    """

    def build_prompt(self, question, retrieved_sections):

        context = ""

        for section in retrieved_sections:

            context += (
                f"Act: {section['act']}\n"
                f"Section: {section['section_number']}\n"
                f"Title: {section['title']}\n\n"
                f"{section['content']}\n"
                f"{'-'*60}\n"
            )

        prompt = f"""
You are NyayaMitra AI, an expert legal assistant specializing in Indian law.

IMPORTANT RULES:
1. Answer ONLY using the legal context provided.
2. Do not make up laws or sections.
3. If the answer is not available in the context, say:
   "I couldn't find sufficient information in the uploaded legal documents."
4. Mention the relevant Act and Section number whenever possible.
5. Explain in simple, professional language.

==========================
LEGAL CONTEXT
==========================

{context}

==========================
USER QUESTION
==========================

{question}

==========================
ANSWER
==========================
"""

        return prompt.strip()