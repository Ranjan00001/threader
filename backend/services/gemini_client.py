"""
Gemini client wrapper.
Handles chat sessions using the Gemini API.
"""

from imports import logger
from google import genai

class GeminiChatService:
    def __init__(self, api_key: str, default_model: str = "gemini-2.0-flash"):
        """
        Initialize Gemini client.
        """
        self.default_model = default_model
        self.client = genai.Client(api_key=api_key)
        logger.info(f"GeminiChatService initialized with model {default_model}")

    def start_chat(self, model: str | None = None):
        """
        Start a new chat session with Gemini.
        """
        model_to_use = model or self.default_model
        logger.info(f"Starting new Gemini chat session with model: {model_to_use}")
        session = self.client.chats.create(model=model_to_use)
        return session

    def send_message(self, session, message: str):
        """
        Send a message in an existing Gemini chat session.
        """
        logger.info(f"Sending message to Gemini: {message}")
        try:
            response = session.send_message(message)
            return response
        except AttributeError:
            return {"response": f"Gemini reply to '{message}'"}
