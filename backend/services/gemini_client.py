"""
Gemini client wrapper.
Handles chat sessions using the Gemini API.
"""

import os
from imports import logger
from google import genai
from google.genai.errors import APIError

gemini_api_key = os.getenv("GEMINI_API_KEY", "")
class GeminiChatService:
    def __init__(self, api_key: str = gemini_api_key, default_model: str = "gemini-2.0-flash"):
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
            logger.info(response)
            return {"response": response.text}
        except AttributeError:
            return {"response": f"Could not get reply for the query => '{message}'"}
        except:
            logger.error("Something went wrong!")
            return {"response": "Error at our side!"}

    def generate_content(self, prompt: str):
        """
        Make a direct, one-off API call without using a chat session history.
        The prompt includes both the context and the query.
        """
        logger.info(f"Making direct content generation call with prompt: {prompt[:100]}...")
        
        try:
            response = self.client.models.generate_content(
                model=self.default_model,
                contents=prompt
            )
            return response.text
        except APIError as e:
            logger.error(f"Gemini API Error during direct call: {e}")
            return {"response": "Error calling Gemini API for new thread content."}
        except Exception:
            logger.error("Something went wrong during direct call!")
            return {"response": "Error at our side for direct call!"}
