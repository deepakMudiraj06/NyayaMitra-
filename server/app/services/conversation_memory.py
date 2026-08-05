from typing import Dict, List


class ConversationMemory:
    """
    Stores multiple conversations in memory.

    Structure:

    {
        "conversation_id": [
            {
                "role": "user",
                "content": "..."
            },
            {
                "role": "assistant",
                "content": "..."
            }
        ]
    }

    Later this class can be replaced with
    SQLite/PostgreSQL without changing ChatService.
    """

    def __init__(self):

        self.conversations: Dict[str, List[Dict]] = {}

    # ----------------------------------------------------

    def _create_if_not_exists(
        self,
        conversation_id: str
    ):

        if conversation_id not in self.conversations:

            self.conversations[conversation_id] = []

    # ----------------------------------------------------

    def add_user_message(
        self,
        conversation_id: str,
        message: str
    ):

        self._create_if_not_exists(conversation_id)

        self.conversations[conversation_id].append({

            "role": "user",

            "content": message

        })

    # ----------------------------------------------------

    def add_assistant_message(
        self,
        conversation_id: str,
        message: str
    ):

        self._create_if_not_exists(conversation_id)

        self.conversations[conversation_id].append({

            "role": "assistant",

            "content": message

        })

    # ----------------------------------------------------

    def get_history(
        self,
        conversation_id: str,
        limit: int = 6
    ):

        self._create_if_not_exists(conversation_id)

        return self.conversations[
            conversation_id
        ][-limit:]

    # ----------------------------------------------------

    def clear(
        self,
        conversation_id: str
    ):

        if conversation_id in self.conversations:

            self.conversations[
                conversation_id
            ] = []

    # ----------------------------------------------------

    def delete(
        self,
        conversation_id: str
    ):

        if conversation_id in self.conversations:

            del self.conversations[
                conversation_id
            ]

    # ----------------------------------------------------

    def list_conversations(self):

        return list(
            self.conversations.keys()
        )