from app.dashboard.model import DashboardModel


class DashboardService:

    @staticmethod
    def stats():

        return {

            "totalAssets":
                DashboardModel.total_assets(),

            "availableAssets":
                DashboardModel.available_assets(),

            "assignedAssets":
                DashboardModel.assigned_assets(),

            "employees":
                DashboardModel.total_employees(),

            "vendors":
                DashboardModel.total_vendors()

        }

    @staticmethod
    def recent_activity():

        return DashboardModel.recent_assignments()

    @staticmethod
    def category_chart():

        return DashboardModel.category_distribution()

    @staticmethod
    def status_chart():

        return DashboardModel.status_distribution()