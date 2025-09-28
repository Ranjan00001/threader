import pytest
from imports import Flask
from routes import all_blueprints

@pytest.fixture
def app():
    app = Flask(__name__)
    for bp in all_blueprints:
        app.register_blueprint(bp)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json == {"status": "ok"}
