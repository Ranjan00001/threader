import pytest
from imports import Flask
from routes import thread_bp

@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(thread_bp)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_create_thread(client):
    data = {"content": "Test thread"}
    response = client.post("/thread/create", json=data)
    assert response.status_code == 200
    assert "thread_id" in response.json

def test_get_thread(client):
    data = {"content": "Another thread"}
    create_resp = client.post("/thread/create", json=data)
    thread_id = create_resp.json["thread_id"]
    get_resp = client.get(f"/thread/{thread_id}")
    assert get_resp.status_code == 200
    assert get_resp.json["id"] == thread_id
