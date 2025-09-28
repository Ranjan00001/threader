"""
Aggregate imports for convenience.
Now you can do:
    from imports import Flask, GeminiClient, logger
"""

# Flask
from .flask_ext import Flask, request, jsonify, Response, CORS

# Gemini
from .gemini import GeminiClient

# Transport
from .transport import stream_sse, SocketIO

# Utils
from .utils import logger, Any, Dict, List

__all__ = [
    # Flask
    "Flask", "request", "jsonify", "Response", "CORS",
    # Gemini
    "GeminiClient",
    # Transport
    "stream_sse", "SocketIO",
    # Utils
    "logger", "Any", "Dict", "List",
]
