from marshmallow import Schema, fields


class VendorSchema(Schema):

    vendorId = fields.Str(required=True)

    companyName = fields.Str(required=True)

    contactPerson = fields.Str(required=True)

    email = fields.Email(required=True)

    phone = fields.Str(required=True)

    address = fields.Str(required=True)

    gstNumber = fields.Str(required=True)

    status = fields.Str(load_default="Active")