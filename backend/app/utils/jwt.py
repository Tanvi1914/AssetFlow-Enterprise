from flask_jwt_extended import create_access_token


def generate_token(user_id, role):
    return create_access_token(
        identity={
            "id": str(user_id),
            "role": role
        }
    )