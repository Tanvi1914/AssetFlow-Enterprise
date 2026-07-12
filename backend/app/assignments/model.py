from app.database.mongodb import assignments


class AssignmentModel:

    @staticmethod
    def create(data):
        return assignments.insert_one(data)

    @staticmethod
    def get_all():
        return list(assignments.find())

    @staticmethod
    def get_active(asset_id):
        return assignments.find_one({
            "assetId": asset_id,
            "status": "Assigned"
        })

    @staticmethod
    def return_asset(asset_id):

        return assignments.update_one(
            {
                "assetId": asset_id,
                "status": "Assigned"
            },
            {
                "$set": {
                    "status": "Returned"
                }
            }
        )

    @staticmethod
    def get_employee_assets(employee_id):

        return list(assignments.find({
            "employeeId": employee_id,
            "status": "Assigned"
        }))