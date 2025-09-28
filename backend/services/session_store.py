"""
In-memory session manager.
Keeps track of Gemini chat sessions for users.
"""

import uuid
from imports import logger

class SessionStore:
    def __init__(self):
        self.sessions = {}  # {session_id: session_object}
        logger.info("SessionStore initialized")

    def create_session(self, client):
        session_id = str(uuid.uuid4())
        session = client.start_chat()
        self.sessions[session_id] = session
        logger.info(f"Created new session {session_id}")
        return session_id, session

    def get_session(self, session_id):
        return self.sessions.get(session_id)

    def delete_session(self, session_id):
        if session_id in self.sessions:
            del self.sessions[session_id]
            logger.info(f"Deleted session {session_id}")
