from app.database.mongodb import categories


class CategoryModel:

    @staticmethod
    def create(category):
        return categories.insert_one(category)

    @staticmethod
    def get_all():
        return list(categories.find())

    @staticmethod
    def get(category_id):
        return categories.find_one({"categoryId": category_id})

    @staticmethod
    def update(category_id, data):
        return categories.update_one(
            {"categoryId": category_id},
            {"$set": data}
        )

    @staticmethod
    def delete(category_id):
        return categories.delete_one(
            {"categoryId": category_id}
        )