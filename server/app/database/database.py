import sqlite3
from pathlib import Path

# ---------------------------------------------------------
# Database Location
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATABASE_PATH = BASE_DIR / "nyayamitra.db"

# ---------------------------------------------------------
# Database Connection
# ---------------------------------------------------------


def get_connection():

    connection = sqlite3.connect(
        DATABASE_PATH,
        check_same_thread=False
    )

    connection.row_factory = sqlite3.Row

    return connection


# ---------------------------------------------------------
# Database Initialization
# ---------------------------------------------------------


def initialize_database():

    print("\n========== DATABASE INITIALIZED ==========")

    connection = get_connection()

    cursor = connection.cursor()

    # -----------------------------------------------------
    # Conversations Table
    # -----------------------------------------------------

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS conversations (

            id TEXT PRIMARY KEY,

            title TEXT,

            created_at TEXT

        )
        """
    )

    # -----------------------------------------------------
    # Messages Table
    # -----------------------------------------------------

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS messages (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            conversation_id TEXT NOT NULL,

            role TEXT NOT NULL,

            content TEXT NOT NULL,

            created_at TEXT NOT NULL,

            FOREIGN KEY (conversation_id)
            REFERENCES conversations(id)
            ON DELETE CASCADE

        )
        """
    )

    connection.commit()

    connection.close()

    print(f"SQLite Database Created At:\n{DATABASE_PATH}")

    print("==========================================\n")