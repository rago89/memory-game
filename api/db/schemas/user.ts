require('dotenv').config();

export const userSchema = {
  collMod: process.env['GAMES_COLLECTION_USER'],
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'password'],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: 'string',
          description: "'name' is required and is a string",
        },
        email: {
          bsonType: 'string',
          minLength: 6,
          maxLength: 40,
          // pattern: '[a-z0-9._%+!$&*=^|~#%{}/-]+@([a-z0-9-]+.){1,}([a-z]{2,22})',
          uniqueItems: true,
          description: 'required and must be a valid email address',
        },
        password: {
          bsonType: 'string',
          minLength: 6,
          maxLength: 40,
          description: "'password' is required and is a string",
        },
        registerDate: {
          bsonType: 'date',
          description: 'It must be a date',
          default: Date.now,
        },
        updateDate: {
          bsonType: 'date',
          description: 'Users update date',
        },
        gameLevel: {
          bsonType: 'string',
          description: 'Current user"s game level',
        },
        avatar: {
          bsonType: 'object',
          required: ['data', 'contentType'],
          properties: {
            data: {
              bsonType: 'string',
              description: 'Image data represented as HEX',
            },
            contentType: {
              bsonType: 'string',
              description: 'type of image',
            },
          },
        },
      },
    },
  },
};
