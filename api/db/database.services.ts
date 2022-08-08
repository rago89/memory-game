import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import { userSchema } from './schemas/user';
import { gameSchema } from './schemas/game';
import finalConfig from '../config/index';

export const collections: {
  users?: mongoDB.Collection;
  games?: mongoDB.Collection;
} = {};

const connectToDatabase = async () => {
  try {
    dotenv.config();

    if (!finalConfig.DB_PATH) {
      throw new Error('DB_PATH is missing');
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      finalConfig.DB_PATH
    );

    await client.connect();

    const db: mongoDB.Db = client.db(process.env['DB_NAME']);

    !db.collection(process.env['COLLECTION_USER']!)
      ? (collections.users = await db.createCollection(
          process.env['COLLECTION_USER']!,
          userSchema
        ))
      : (collections.users = db.collection(process.env['COLLECTION_USER']!));

    !db.collection(process.env['COLLECTION_GAME']!)
      ? await db.createCollection(process.env['COLLECTION_GAME']!, gameSchema)
      : (collections.games = db.collection(process.env['COLLECTION_GAME']!));

    console.log(
      `Successfully connected to database: ${db.databaseName} and collections: '${collections.users.collectionName}', '${collections.games?.collectionName}' `
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
