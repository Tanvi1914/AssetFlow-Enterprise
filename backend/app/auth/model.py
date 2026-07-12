from app.database.mongodb import users


class UserModel:

    @staticmethod
    def get_by_email(email):
        return users.find_one({
            "email": email
        })

    @staticmethod
    def create(user):
        return users.insert_one(user)

    @staticmethod
    def get_by_id(user_id):
        return users.find_one({
            "_id": user_id
        })