"""
App configuration loader.
Central place for environment variables and settings.
"""

import os

class Config:
    API_KEY = os.getenv("GEMINI_API_KEY", "dummy-key")
    MODEL = os.getenv("MODEL", 'gemini-2.0-flash')
    DEBUG = os.getenv("DEBUG", "true").lower() == "true"
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "5000"))

config = Config()
