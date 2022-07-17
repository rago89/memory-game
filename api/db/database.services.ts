import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import { userSchema } from './schemas/user';
const config = require('../config');

export const collections: { users?: mongoDB.Collection } = {};

const connectToDatabase = async () => {
  try {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.DB_PATH);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env['DB_NAME']);

    await db.command(userSchema);

    const gamesCollection: mongoDB.Collection = db.collection(
      process.env['GAMES_COLLECTION_USER']!
    );

    collections.users = gamesCollection;

    console.log(
      `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
