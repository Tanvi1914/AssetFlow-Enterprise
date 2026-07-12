from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.assets.routes import asset_bp
from app.config import Config
from app.auth.routes import auth_bp
from app.employees import employee_bp
from app.assignments import assignment_bp
from app.dashboard import dashboard_bp
from app.vendors import vendor_bp
from app.categories import category_bp
jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    jwt.init_app(app)
    app.register_blueprint(
    employee_bp,
    url_prefix="/api/employees"
)
    app.register_blueprint(
    assignment_bp,
    url_prefix="/api/assignments"
)
    app.register_blueprint(
    dashboard_bp,
    url_prefix="/api/dashboard"
)
    app.register_blueprint(
    category_bp,
    url_prefix="/api/categories"
)
    app.register_blueprint(
    vendor_bp,
    url_prefix="/api/vendors"
)
    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )
    app.register_blueprint(
    asset_bp,
    url_prefix="/api/assets"
)

    @app.route("/")
    def home():
        return {
            "success": True,
            "message": "AssetFlow Backend Running 🚀"
        }

    return app