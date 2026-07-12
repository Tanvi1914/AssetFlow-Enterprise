from flask import Blueprint, request

from app.vendors.schemas import VendorSchema
from app.vendors.service import VendorService
from app.utils.response import success, error

vendor_bp = Blueprint("vendors", __name__)

vendor_schema = VendorSchema()


@vendor_bp.route("/", methods=["POST"])
def create_vendor():

    data = request.get_json()

    errors = vendor_schema.validate(data)

    if errors:
        return error(errors)

    vendor = VendorService.create(data)

    return success(
        "Vendor created successfully",
        vendor,
        201
    )


@vendor_bp.route("/", methods=["GET"])
def get_vendors():

    vendors = VendorService.get_all()

    return success(
        "Vendors fetched successfully",
        vendors
    )


@vendor_bp.route("/<vendor_id>", methods=["GET"])
def get_vendor(vendor_id):

    vendor = VendorService.get(vendor_id)

    if vendor is None:
        return error("Vendor not found", 404)

    return success(
        "Vendor fetched successfully",
        vendor
    )


@vendor_bp.route("/<vendor_id>", methods=["PUT"])
def update_vendor(vendor_id):

    data = request.get_json()

    vendor = VendorService.update(vendor_id, data)

    if vendor is None:
        return error("Vendor not found", 404)

    return success(
        "Vendor updated successfully",
        vendor
    )


@vendor_bp.route("/<vendor_id>", methods=["DELETE"])
def delete_vendor(vendor_id):

    vendor = VendorService.get(vendor_id)

    if vendor is None:
        return error("Vendor not found", 404)

    VendorService.delete(vendor_id)

    return success(
        "Vendor deleted successfully"
    )