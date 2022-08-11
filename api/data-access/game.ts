import { collections } from '../db/database.services';
import { ObjectId } from 'mongodb';
import Game from '../models/game';

export type DeleteResponse = { acknowledged: boolean; deletedCount: number };
export type UpdateResponse = { acknowledged: boolean; modifiedCount: number };

export interface UserDbAccess {
  create(gameData: Game): Promise<Game>;
  getOne(id: ObjectId): Promise<Game>;
  updateOne(newData: Game): Promise<UpdateResponse | undefined>;
}
const databaseAccess: UserDbAccess = {
  async create(gameData) {
    const result = await collections.games?.insertOne(gameData);
    if (result?.insertedId) {
      const game = await this.getOne(result?.insertedId!);
      return game;
    }
    throw new Error('An error has occurred');
  },
  async getOne(id) {
    const game = (await collections.games?.findOne({
      _id: new ObjectId(id),
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
