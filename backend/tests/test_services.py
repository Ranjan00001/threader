import pytest
from services import GeminiChatService, SessionStore

def test_gemini_start_chat():
    service = GeminiChatService()
    session = service.start_chat()
    assert "session" in session

def test_send_message():
    service = GeminiChatService()
    session = service.start_chat()
    resp = service.send_message(session, "Hello")
    assert "response" in resp

def test_session_store():
    service = GeminiChatService()
    store = SessionStore()
    session_id, session = store.create_session(service)
    assert store.get_session(session_id) == session
    store.delete_session(session_id)
    assert store.get_session(session_id) is None
