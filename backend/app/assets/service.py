from datetime import datetime

from app.assets.model import AssetModel


class AssetService:

    @staticmethod
    def create(data):

        data["createdAt"] = datetime.utcnow()
        data["updatedAt"] = datetime.utcnow()

        AssetModel.create(data)

        return data

    @staticmethod
    def get_all():
        return AssetModel.get_all()

    @staticmethod
    def get(asset_id):
        return AssetModel.get(asset_id)

    @staticmethod
    def update(asset_id, data):

        data["updatedAt"] = datetime.utcnow()

        AssetModel.update(asset_id, data)

        return AssetModel.get(asset_id)

    @staticmethod
    def delete(asset_id):

        AssetModel.delete(asset_id)

        return True