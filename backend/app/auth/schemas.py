from marshmallow import Schema, fields


class RegisterSchema(Schema):

    name = fields.Str(required=True)

    email = fields.Email(required=True)

    password = fields.Str(required=True)

    role = fields.Str(required=True)


class LoginSchema(Schema):

    email = fields.Email(required=True)

    password = fields.Str(required=True)