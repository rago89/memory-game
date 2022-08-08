require('dotenv').config();

export const gameSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'gameLevel'],
      additionalProperties: false,
      properties: {
        _id: {},
        userId: {},
        gameLevel: {
          bsonType: 'string',
          description: 'Current user"s game level',
        },
      },
    },
  },
};
