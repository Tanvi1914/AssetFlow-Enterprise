from flask import Blueprint

from app.dashboard.service import DashboardService
from app.utils.response import success

dashboard_bp = Blueprint(
    "dashboard",
    __name__
)


@dashboard_bp.route("/stats")
def stats():

    return success(
        "Dashboard statistics",
        DashboardService.stats()
    )


@dashboard_bp.route("/recent")
def recent():

    return success(
        "Recent activities",
        DashboardService.recent_activity()
    )


@dashboard_bp.route("/categories")
def categories():

    return success(
        "Category distribution",
        DashboardService.category_chart()
    )


@dashboard_bp.route("/status")
def status():

    return success(
        "Status distribution",
        DashboardService.status_chart()
    )