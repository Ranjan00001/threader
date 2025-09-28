"""
Thread routes: create and nest threads (like Reddit).
"""

from flask import Blueprint, request, jsonify
from imports import logger

thread_bp = Blueprint("thread", __name__)

# In-memory thread store (replace with DB if needed later)
threads = {}

@thread_bp.route("/thread/create", methods=["POST"])
def create_thread():
    """
    Create a new thread or sub-thread.
    Request body: { "parent_id": optional, "content": "..." }
    """
    data = request.get_json()
    parent_id = data.get("parent_id")
    content = data.get("content", "")

    if not content:
        return jsonify({"error": "Content is required"}), 400

    thread_id = str(len(threads) + 1)
    threads[thread_id] = {"id": thread_id, "content": content, "children": []}

    if parent_id and parent_id in threads:
        threads[parent_id]["children"].append(thread_id)

    logger.info(f"Created thread {thread_id}")
    return jsonify({"thread_id": thread_id, "content": content})


@thread_bp.route("/thread/<thread_id>", methods=["GET"])
def get_thread(thread_id):
    """
    Fetch a thread by ID, including children.
    """
    thread = threads.get(thread_id)
    if not thread:
        return jsonify({"error": "Thread not found"}), 404

    return jsonify(thread)
