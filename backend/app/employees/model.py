from app.database.mongodb import employees


class EmployeeModel:

    @staticmethod
    def create(employee):
        return employees.insert_one(employee)

    @staticmethod
    def get_all():
        return list(employees.find())

    @staticmethod
    def get(employee_id):
        return employees.find_one({"employeeId": employee_id})

    @staticmethod
    def update(employee_id, data):
        return employees.update_one(
            {"employeeId": employee_id},
            {"$set": data}
        )

    @staticmethod
    def delete(employee_id):
        return employees.delete_one(
            {"employeeId": employee_id}
        )