from flask import Blueprint, request

from app.assignments.schemas import AssignmentSchema
from app.assignments.service import AssignmentService
from app.utils.response import success, error

assignment_bp = Blueprint("assignments", __name__)

schema = AssignmentSchema()


@assignment_bp.route("/assign", methods=["POST"])
def assign_asset():

    data = request.get_json()

    errors = schema.validate(data)

    if errors:
        return error(errors)

    assignment = AssignmentService.assign(data)

    return success(
        "Asset assigned successfully",
        assignment,
        201
    )


@assignment_bp.route("/return/<asset_id>", methods=["POST"])
def return_asset(asset_id):

    AssignmentService.return_asset(asset_id)

    return success(
        "Asset returned successfully"
    )


@assignment_bp.route("/history", methods=["GET"])
def history():

    return success(
        "Assignment history",
        AssignmentService.history()
    )


@assignment_bp.route("/employee/<employee_id>", methods=["GET"])
def employee_assets(employee_id):

    return success(
        "Employee assets",
        AssignmentService.employee_assets(employee_id)
    )