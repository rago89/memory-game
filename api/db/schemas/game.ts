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
          bsonType: 'number',
          description: 'Current user"s game level',
          default: 0,
        },
        updateDate: {
          bsonType: 'date',
          description: 'Current user"s game update date level',
        },
      },
    },
  },
};
