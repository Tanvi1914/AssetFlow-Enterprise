from datetime import datetime

from app.vendors.model import VendorModel


class VendorService:

    @staticmethod
    def create(data):

        data["createdAt"] = datetime.utcnow()
        data["updatedAt"] = datetime.utcnow()

        VendorModel.create(data)

        return data

    @staticmethod
    def get_all():
        return VendorModel.get_all()

    @staticmethod
    def get(vendor_id):
        return VendorModel.get(vendor_id)

    @staticmethod
    def update(vendor_id, data):

        data["updatedAt"] = datetime.utcnow()

        VendorModel.update(vendor_id, data)

        return VendorModel.get(vendor_id)

    @staticmethod
    def delete(vendor_id):

        VendorModel.delete(vendor_id)

        return True