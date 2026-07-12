from app.database.mongodb import (
    assets,
    employees,
    vendors,
    assignments
)


class DashboardModel:

    @staticmethod
    def total_assets():
        return assets.count_documents({})

    @staticmethod
    def available_assets():
        return assets.count_documents({
            "status": "Available"
        })

    @staticmethod
    def assigned_assets():
        return assets.count_documents({
            "status": "Assigned"
        })

    @staticmethod
    def total_employees():
        return employees.count_documents({})

    @staticmethod
    def total_vendors():
        return vendors.count_documents({})

    @staticmethod
    def recent_assignments():

        return list(
            assignments.find()
            .sort("assignedAt", -1)
            .limit(10)
        )

    @staticmethod
    def category_distribution():

        pipeline = [
            {
                "$group": {
                    "_id": "$category",
                    "count": {
                        "$sum": 1
                    }
                }
            }
        ]

        return list(
            assets.aggregate(pipeline)
        )

    @staticmethod
    def status_distribution():

        pipeline = [
            {
                "$group": {
                    "_id": "$status",
                    "count": {
                        "$sum": 1
                    }
                }
            }
        ]

        return list(
            assets.aggregate(pipeline)
        )