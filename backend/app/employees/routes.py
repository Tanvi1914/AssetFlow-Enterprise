from flask import Blueprint, request

from app.employees.schemas import EmployeeSchema
from app.employees.service import EmployeeService
from app.utils.response import success, error

employee_bp = Blueprint("employees", __name__)

employee_schema = EmployeeSchema()


@employee_bp.route("/", methods=["POST"])
def create_employee():

    data = request.get_json()

    errors = employee_schema.validate(data)

    if errors:
        return error(errors)

    employee = EmployeeService.create(data)

    return success(
        "Employee created successfully",
        employee,
        201
    )


@employee_bp.route("/", methods=["GET"])
def get_employees():

    employees = EmployeeService.get_all()

    return success(
        "Employees fetched successfully",
        employees
    )


@employee_bp.route("/<employee_id>", methods=["GET"])
def get_employee(employee_id):

    employee = EmployeeService.get(employee_id)

    if employee is None:
        return error("Employee not found", 404)

    return success(
        "Employee fetched successfully",
        employee
    )


@employee_bp.route("/<employee_id>", methods=["PUT"])
def update_employee(employee_id):

    data = request.get_json()

    employee = EmployeeService.update(employee_id, data)

    if employee is None:
        return error("Employee not found", 404)

    return success(
        "Employee updated successfully",
        employee
    )


@employee_bp.route("/<employee_id>", methods=["DELETE"])
def delete_employee(employee_id):

    employee = EmployeeService.get(employee_id)

    if employee is None:
        return error("Employee not found", 404)

    EmployeeService.delete(employee_id)

    return success(
        "Employee deleted successfully"
    )