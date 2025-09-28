import pytest
from imports import Flask
from routes import chat_bp
from services import GeminiChatService, SessionStore

@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(chat_bp)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_start_chat(client):
    response = client.post("/chat/start")
    assert response.status_code == 200
    assert "session_id" in response.json
