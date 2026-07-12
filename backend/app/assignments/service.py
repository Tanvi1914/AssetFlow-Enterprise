from datetime import datetime

from app.assets.model import AssetModel
from app.assignments.model import AssignmentModel


class AssignmentService:

    @staticmethod
    def assign(data):

        assignment = {

            "assetId": data["assetId"],

            "employeeId": data["employeeId"],

            "assignedBy": data["assignedBy"],

            "assignedAt": datetime.utcnow(),

            "returnedAt": None,

            "status": "Assigned"
        }

        AssignmentModel.create(assignment)

        AssetModel.update(
            data["assetId"],
            {
                "assignedTo": data["employeeId"],
                "status": "Assigned"
            }
        )

        return assignment

    @staticmethod
    def return_asset(asset_id):

        AssignmentModel.return_asset(asset_id)

        AssetModel.update(
            asset_id,
            {
                "assignedTo": "",
                "status": "Available"
            }
        )

        return True

    @staticmethod
    def history():

        return AssignmentModel.get_all()

    @staticmethod
    def employee_assets(employee_id):

        return AssignmentModel.get_employee_assets(
            employee_id
        )