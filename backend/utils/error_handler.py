"""
Centralized error handling helpers.
"""

from flask import jsonify
from imports import logger

def handle_error(message: str, code: int = 400):
    """
    Return a JSON error response.
    """
    logger.error(f"Error {code}: {message}")
    return jsonify({"status": "error", "message": message}), code

def register_error_handlers(app):
    """
    Register global error handlers for the Flask app.
    """
    @app.errorhandler(404)
    def not_found(error):
        return handle_error("Not Found", 404)

    @app.errorhandler(500)
    def internal_error(error):
        return handle_error("Internal Server Error", 500)
