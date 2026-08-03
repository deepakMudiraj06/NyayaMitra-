from app.services.llm_service import LLMService

llm = LLMService()

response = llm.generate(
    "What is Artificial Intelligence?"
)

print(response)