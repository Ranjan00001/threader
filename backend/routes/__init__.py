"""
Collects all route blueprints for easy registration.
"""

from .chat_routes import chat_bp
from .thread_routes import thread_bp
from .health_routes import health_bp

all_blueprints = [chat_bp, thread_bp, health_bp]
