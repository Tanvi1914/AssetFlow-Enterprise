from flask import Blueprint, request

from app.categories.schemas import CategorySchema
from app.categories.service import CategoryService
from app.utils.response import success, error

category_bp = Blueprint("categories", __name__)

category_schema = CategorySchema()


@category_bp.route("/", methods=["POST"])
def create_category():

    data = request.get_json()

    errors = category_schema.validate(data)

    if errors:
        return error(errors)

    category = CategoryService.create(data)

    return success(
        "Category created successfully",
        category,
        201
    )


@category_bp.route("/", methods=["GET"])
def get_categories():

    return success(
        "Categories fetched successfully",
        CategoryService.get_all()
    )


@category_bp.route("/<category_id>", methods=["GET"])
def get_category(category_id):

    category = CategoryService.get(category_id)

    if category is None:
        return error("Category not found", 404)

    return success(
        "Category fetched successfully",
        category
    )


@category_bp.route("/<category_id>", methods=["PUT"])
def update_category(category_id):

    data = request.get_json()

    category = CategoryService.update(category_id, data)

    if category is None:
        return error("Category not found", 404)

    return success(
        "Category updated successfully",
        category
    )


@category_bp.route("/<category_id>", methods=["DELETE"])
def delete_category(category_id):

    category = CategoryService.get(category_id)

    if category is None:
        return error("Category not found", 404)

    CategoryService.delete(category_id)

    return success(
        "Category deleted successfully"
    )