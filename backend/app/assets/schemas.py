from marshmallow import Schema, fields


class AssetSchema(Schema):

    assetId = fields.Str(required=True)

    assetName = fields.Str(required=True)

    category = fields.Str(required=True)

    brand = fields.Str(required=True)

    serialNumber = fields.Str(required=True)

    purchaseDate = fields.Str(required=True)

    purchasePrice = fields.Float(required=True)

    vendor = fields.Str(required=True)

    assignedTo = fields.Str(load_default="")

    status = fields.Str(load_default="Available")

    location = fields.Str(required=True)