"""
Gemini client wrapper.
Handles chat sessions using Gemini API.
"""

from imports import GeminiClient, logger

# Normally this would load API key from env
API_KEY = "dummy-key"  # TODO: replace with real config/env

class GeminiChatService:
    def __init__(self):
        self.client = GeminiClient(api_key=API_KEY)
        logger.info("GeminiChatService initialized")

    def start_chat(self):
        """
        Start a new chat session with Gemini.
        """
        logger.info("Starting new Gemini chat session")
        return self.client.start_chat()

    def send_message(self, session, message: str):
        """
        Send a message in an existing Gemini chat session.
        """
        logger.info(f"Sending message to Gemini: {message}")
        # In real impl: return session.send_message(message)
        return {"response": f"Gemini reply to '{message}'"}
