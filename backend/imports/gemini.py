"""
Gemini API client imports.
This is the single source of truth for Gemini-related setup.
"""

# Placeholder for actual Gemini API client import
# In real use, replace with: `from google.generativeai import GenerativeModel`

class GeminiClientStub:
    """Stub for Gemini client — replace with actual implementation."""
    def __init__(self, api_key: str):
        self.api_key = api_key

    def start_chat(self):
        # This should return a chat session object from Gemini
        return {"session": "new"}

# Expose stub for now
GeminiClient = GeminiClientStub

__all__ = ["GeminiClient"]
