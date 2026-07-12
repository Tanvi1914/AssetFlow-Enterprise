from app.database.mongodb import vendors


class VendorModel:

    @staticmethod
    def create(vendor):
        return vendors.insert_one(vendor)

    @staticmethod
    def get_all():
        return list(vendors.find())

    @staticmethod
    def get(vendor_id):
        return vendors.find_one({"vendorId": vendor_id})

    @staticmethod
    def update(vendor_id, data):
        return vendors.update_one(
            {"vendorId": vendor_id},
            {"$set": data}
        )

    @staticmethod
    def delete(vendor_id):
        return vendors.delete_one(
            {"vendorId": vendor_id}
        )