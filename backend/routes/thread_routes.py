"""
Thread routes: create and nest threads (like Reddit).
"""

from flask import Blueprint, request, jsonify
from imports import logger
from services import GeminiChatService
import uuid

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
    parentThreadId = data.get("parentThreadId")
    query = data.get("query", "")
    selected_text = data.get("selectedText", "")
    context = data.get("context", "")

    if not query:
        return jsonify({"error": "Query is required"}), 400

    thread_id = str(uuid.uuid4())
    gemini_service = GeminiChatService()
    prompt = f"""Explain the part {selected_text}. 
                Here is the question asked by user: {query}
                in context with {context}.
                Provide the answer in 3 to 4 lines.
            """

    response = gemini_service.generate_content(prompt=prompt)

    logger.info(f"Created thread {thread_id}")
    return jsonify({"thread_id": thread_id,
                    "query": query,
                    "response": response,
                    "parentThreadId": parentThreadId,
                })


# @thread_bp.route("/thread/<thread_id>", methods=["GET"])
# def get_thread(thread_id):
#     """
#     Fetch a thread by ID, including children.
#     """
#     thread = threads.get(thread_id)
#     if not thread:
#         return jsonify({"error": "Thread not found"}), 404

#     return jsonify(thread)
