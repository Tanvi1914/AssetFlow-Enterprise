from app.database.mongodb import assets


class AssetModel:

    @staticmethod
    def create(asset):
        return assets.insert_one(asset)

    @staticmethod
    def get_all():
        return list(assets.find())

    @staticmethod
    def get(asset_id):
        return assets.find_one({"assetId": asset_id})

    @staticmethod
    def update(asset_id, data):
        return assets.update_one(
            {"assetId": asset_id},
            {"$set": data}
        )

    @staticmethod
    def delete(asset_id):
        return assets.delete_one(
            {"assetId": asset_id}
        )