import { collections } from '../db/database.services';
import { ObjectId } from 'mongodb';
import Game from '../models/game';

export type DeleteResponse = { acknowledged: boolean; deletedCount: number };
export type UpdateResponse = { acknowledged: boolean; modifiedCount: number };

export interface UserDbAccess {
  create(gameData: Game): Promise<Game>;
  getAll(): Promise<Game[]>;
  getOne(id: string): Promise<Game>;
  updateOne(newData: Game): Promise<UpdateResponse | undefined>;
}
const databaseAccess: UserDbAccess = {
  async create(gameData) {
    const result = await collections.games?.insertOne(gameData);
    if (result?.insertedId) {
      const game = (await await collections.games?.findOne({
        _id: result.insertedId,
      })) as Game;
      return game;
    }
    throw new Error('An error has occurred');
  },
  async getAll() {
    const games = (await collections.games?.find().toArray()) as Game[];
    return games;
  },
  async getOne(id) {
    const game = (await collections.games?.findOne({
      userId: id,
    })) as Game;
    return game;
  },
  async updateOne(newData) {
    const updateGame = await collections.games?.updateOne(
      {
        $and: [{ _id: new ObjectId(newData._id) }, { userId: newData.userId }],
      },
      { $set: newData }
    );
    if (updateGame?.modifiedCount === 1) {
      await collections.games?.updateOne(
        { _id: new ObjectId(newData._id) },
        { $set: { updateDate: new Date() } }
      );
    }
    return updateGame;
  },
};

export default databaseAccess;
