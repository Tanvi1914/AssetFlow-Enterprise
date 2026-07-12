import bcrypt

from app.auth.model import UserModel
from app.utils.jwt import generate_token


class AuthService:

    @staticmethod
    def register(data):

        existing = UserModel.get_by_email(data["email"])

        if existing:
            return None

        hashed = bcrypt.hashpw(
            data["password"].encode(),
            bcrypt.gensalt()
        )

        user = {
            "name": data["name"],
            "email": data["email"],
            "password": hashed.decode(),
            "role": data["role"]
        }

        result = UserModel.create(user)

        token = generate_token(
            result.inserted_id,
            user["role"]
        )

        return {
            "token": token,
            "user": {
                "id": str(result.inserted_id),
                "name": user["name"],
                "email": user["email"],
                "role": user["role"]
            }
        }

    @staticmethod
    def login(data):

        user = UserModel.get_by_email(data["email"])

        if not user:
            return None

        valid = bcrypt.checkpw(
            data["password"].encode(),
            user["password"].encode()
        )

        if not valid:
            return None

        token = generate_token(
            user["_id"],
            user["role"]
        )

        return {
            "token": token,
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user["role"]
            }
        }