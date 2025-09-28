"""
Chat routes: start chat, send message, stream responses.
"""

import os
from flask import Blueprint, request, jsonify
from services import GeminiChatService, SessionStore, sse_response, fake_generator
from utils.config import config

chat_bp = Blueprint("chat", __name__)

api_key = config.API_KEY
model = config.MODEL

gemini_service = GeminiChatService(api_key, model)
session_store = SessionStore()


@chat_bp.route("/chat/start", methods=["POST"])
def start_chat():
    """
    Start a new Gemini chat session.
    """
    session_id, session = session_store.create_session(gemini_service)
    return jsonify({"session_id": session_id})


@chat_bp.route("/chat/send/<session_id>", methods=["POST"])
def send_message(session_id):
    """
    Send a message to an existing session.
    """
    data = request.get_json()
    message = data.get("message", "")

    session = session_store.get_session(session_id)
    print(session, message, '------------------------------------------')
    if not session:
        return jsonify({"error": "Session not found"}), 404

    response = gemini_service.send_message(session, message)
    return jsonify(response)


@chat_bp.route("/chat/stream/<session_id>")
def stream_response(session_id):
    """
    Stream Gemini response for a given session.
    """
    session = session_store.get_session(session_id)
    if not session:
        return jsonify({"error": "Session not found"}), 404

    # Replace fake_generator with Gemini streaming generator
    return sse_response(fake_generator)
