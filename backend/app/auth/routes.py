from flask import Blueprint, request

from app.auth.schemas import RegisterSchema, LoginSchema
from app.auth.service import AuthService
from app.utils.response import success, error

auth_bp = Blueprint("auth", __name__)

register_schema = RegisterSchema()
login_schema = LoginSchema()


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    errors = register_schema.validate(data)

    if errors:
        return error(errors)

    result = AuthService.register(data)

    if not result:
        return error("Email already exists")

    return success("User registered", result, 201)


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    errors = login_schema.validate(data)

    if errors:
        return error(errors)

    result = AuthService.login(data)

    if not result:
        return error("Invalid email or password", 401)

    return success("Login successful", result)