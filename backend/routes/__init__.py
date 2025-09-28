"""
Collects all route blueprints for easy registration.
"""

from .home import home_bp
from .chat_routes import chat_bp
from .thread_routes import thread_bp
from .health_routes import health_bp

all_blueprints = [home_bp, chat_bp, thread_bp, health_bp]
