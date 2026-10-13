import uuid

from app.services.chat_service import ChatService

chatbot = ChatService()

question = input("Ask your legal question: ")

response = chatbot.chat(
    conversation_id=str(uuid.uuid4()),
    question=question,
)

print("\n")
print("=" * 80)

print("QUESTION")
print(response["question"])

print("\n")

print("ANSWER")
print(response["answer"])

print("\n")

print("CITATIONS")

for citation in response["citations"]:

    print("-" * 50)

    print(f"Act     : {citation['act']}")

    print(f"Section : {citation['section']}")

    print(f"Title   : {citation['title']}")

    print(f"Page    : {citation['page']}")
