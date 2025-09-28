from flask import Blueprint, jsonify

home_bp = Blueprint("home", __name__)
@home_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message":"Up and running", "check":"goto /health for health check up"})
