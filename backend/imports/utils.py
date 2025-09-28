"""
Common utilities: logging, typing, etc.
"""

import logging
from typing import Any, Dict, List

# Configure logging (global default)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

logger = logging.getLogger(__name__)

__all__ = ["logger", "Any", "Dict", "List"]
