from functools import wraps

from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended import get_jwt_identity

from app.utils.response import error


def jwt_required_with_role(roles=None):

    if roles is None:
        roles = []

    def decorator(fn):

        @wraps(fn)
        def wrapper(*args, **kwargs):

            try:
                verify_jwt_in_request()

                user = get_jwt_identity()

                if roles and user["role"] not in roles:
                    return error("Unauthorized", 403)

                return fn(*args, **kwargs)

            except Exception:
                return error("Invalid or expired token", 401)

        return wrapper

    return decorator