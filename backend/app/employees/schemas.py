from marshmallow import Schema, fields


class EmployeeSchema(Schema):

    employeeId = fields.Str(required=True)

    name = fields.Str(required=True)

    email = fields.Email(required=True)

    phone = fields.Str(required=True)

    department = fields.Str(required=True)

    designation = fields.Str(required=True)

    joiningDate = fields.Str(required=True)

    status = fields.Str(load_default="Active")