from imports import Flask, CORS, logger
from routes import all_blueprints
from utils import config, register_error_handlers

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Register routes
for bp in all_blueprints:
    app.register_blueprint(bp)

# Register error handlers
register_error_handlers(app)

if __name__ == "__main__":
    logger.info("Starting backend server")
    app.run(host=config.HOST, port=config.PORT, debug=config.DEBUG)
