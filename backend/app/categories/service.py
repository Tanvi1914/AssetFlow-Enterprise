from datetime import datetime

from app.categories.model import CategoryModel


class CategoryService:

    @staticmethod
    def create(data):

        data["createdAt"] = datetime.utcnow()
        data["updatedAt"] = datetime.utcnow()

        CategoryModel.create(data)

        return data

    @staticmethod
    def get_all():
        return CategoryModel.get_all()

    @staticmethod
    def get(category_id):
        return CategoryModel.get(category_id)

    @staticmethod
    def update(category_id, data):

        data["updatedAt"] = datetime.utcnow()

        CategoryModel.update(category_id, data)

        return CategoryModel.get(category_id)

    @staticmethod
    def delete(category_id):

        CategoryModel.delete(category_id)

        return True