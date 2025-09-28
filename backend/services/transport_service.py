"""
Transport service for streaming Gemini responses.
Abstracted to support SSE or WebSocket.
"""

from imports import stream_sse, logger

def sse_response(generator_func):
    """
    Convert a generator into an SSE response.
    """
    logger.info("Streaming SSE response")
    return stream_sse(generator_func)

def fake_generator():
    """
    Example generator that mimics Gemini streaming.
    Replace with real Gemini streaming.
    """
    yield "data: Hello\n\n"
    yield "data: This is a streamed response\n\n"
    yield "data: [DONE]\n\n"
