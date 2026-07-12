from datetime import datetime

from app.employees.model import EmployeeModel


class EmployeeService:

    @staticmethod
    def create(data):

        data["createdAt"] = datetime.utcnow()
        data["updatedAt"] = datetime.utcnow()

        EmployeeModel.create(data)

        return data

    @staticmethod
    def get_all():
        return EmployeeModel.get_all()

    @staticmethod
    def get(employee_id):
        return EmployeeModel.get(employee_id)

    @staticmethod
    def update(employee_id, data):

        data["updatedAt"] = datetime.utcnow()

        EmployeeModel.update(employee_id, data)

        return EmployeeModel.get(employee_id)

    @staticmethod
    def delete(employee_id):

        EmployeeModel.delete(employee_id)

        return True