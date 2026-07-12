from marshmallow import Schema, fields


class CategorySchema(Schema):

    categoryId = fields.Str(required=True)

    categoryName = fields.Str(required=True)

    description = fields.Str(required=True)

    status = fields.Str(load_default="Active")