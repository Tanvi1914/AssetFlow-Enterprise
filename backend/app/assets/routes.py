from flask import Blueprint, request

from app.assets.schemas import AssetSchema
from app.assets.service import AssetService
from app.utils.response import success, error

asset_bp = Blueprint("assets", __name__)

asset_schema = AssetSchema()

@asset_bp.route("/", methods=["POST"])
def create_asset():

    data = request.get_json()

    errors = asset_schema.validate(data)

    if errors:
        return error(errors)

    asset = AssetService.create(data)

    return success(
        "Asset created successfully",
        asset,
        201
    )
@asset_bp.route("/", methods=["GET"])
def get_assets():

    assets = AssetService.get_all()

    return success(
        "Assets fetched successfully",
        assets
    )

@asset_bp.route("/<asset_id>", methods=["GET"])
def get_asset(asset_id):

    asset = AssetService.get(asset_id)

    if asset is None:
        return error("Asset not found", 404)

    return success(
        "Asset fetched successfully",
        asset
    )

@asset_bp.route("/<asset_id>", methods=["PUT"])
def update_asset(asset_id):

    data = request.get_json()

    asset = AssetService.update(asset_id, data)

    if asset is None:
        return error("Asset not found", 404)

    return success(
        "Asset updated successfully",
        asset
    )
@asset_bp.route("/<asset_id>", methods=["DELETE"])
def delete_asset(asset_id):

    asset = AssetService.get(asset_id)

    if asset is None:
        return error("Asset not found", 404)

    AssetService.delete(asset_id)

    return success(
        "Asset deleted successfully"
    )