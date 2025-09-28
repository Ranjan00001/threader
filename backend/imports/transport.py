"""
Transport layer abstraction.
Supports both SSE and WebSocket (swap implementation later).
"""

from flask import Response

def stream_sse(generator_func):
    """
    Wraps a generator into SSE response.
    Example usage:
        return stream_sse(my_generator)
    """
    return Response(generator_func(), mimetype="text/event-stream")

# Stub WebSocket (if we add Flask-SocketIO later)
try:
    from flask_socketio import SocketIO
except ImportError:
    SocketIO = None

__all__ = ["stream_sse", "SocketIO"]
