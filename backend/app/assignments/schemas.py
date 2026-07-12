from marshmallow import Schema, fields


class AssignmentSchema(Schema):

    assetId = fields.Str(required=True)

    employeeId = fields.Str(required=True)

    assignedBy = fields.Str(required=True)