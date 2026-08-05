from datetime import datetime

from app.database.database import get_connection


class ConversationRepository:

    # -----------------------------------------------------

    def create_conversation(
        self,
        conversation_id: str,
        title: str
    ):

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT OR IGNORE INTO conversations(
                id,
                title,
                created_at
            )
            VALUES (?, ?, ?)
            """,
            (
                conversation_id,
                title,
                datetime.now().isoformat()
            )
        )

        connection.commit()

        connection.close()

    # -----------------------------------------------------

    def save_message(
        self,
        conversation_id: str,
        role: str,
        content: str
    ):

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO messages(

                conversation_id,

                role,

                content,

                created_at

            )
            VALUES (?, ?, ?, ?)
            """,
            (
                conversation_id,
                role,
                content,
                datetime.now().isoformat()
            )
        )

        connection.commit()

        connection.close()

    # -----------------------------------------------------

    def get_messages(
        self,
        conversation_id: str,
        limit: int = 6
    ):

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT role, content

            FROM messages

            WHERE conversation_id = ?

            ORDER BY id DESC

            LIMIT ?
            """,
            (
                conversation_id,
                limit
            )
        )

        rows = cursor.fetchall()

        connection.close()

        history = []

        for row in reversed(rows):

            history.append({

                "role": row["role"],

                "content": row["content"]

            })

        return history

    # -----------------------------------------------------

    def list_conversations(self):

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT id, title

            FROM conversations

            ORDER BY created_at DESC
            """
        )

        rows = cursor.fetchall()

        connection.close()

        return [

            {

                "id": row["id"],

                "title": row["title"]

            }

            for row in rows

        ]

    # -----------------------------------------------------

    def delete_conversation(
        self,
        conversation_id: str
    ):

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            DELETE FROM messages

            WHERE conversation_id = ?
            """,
            (conversation_id,)
        )

        cursor.execute(
            """
            DELETE FROM conversations

            WHERE id = ?
            """,
            (conversation_id,)
        )

        connection.commit()

        connection.close()

    # -----------------------------------------------------

    def clear_conversation(
        self,
        conversation_id: str
    ):

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            DELETE FROM messages

            WHERE conversation_id = ?
            """,
            (conversation_id,)
        )

        connection.commit()

        connection.close()