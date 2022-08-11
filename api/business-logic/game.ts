import { ObjectId } from 'mongodb';
import { default as dbAccess } from './../data-access/game';
import Game from '../models/game';

export interface GameManager {
  postGame(newGame: Game): Promise<Game>;
  getOne(id: ObjectId): Promise<Game>;
  updateOne(newData: Game): Promise<Game | undefined>;
}

const gameManager: GameManager = {
  postGame: async (newGame) => {
    return await dbAccess.create(newGame);
  },
  getOne: async (id) => {
    return await dbAccess.getOne(id);
  },
  updateOne: async (newData) => {
    const sendDataToUpdate = await dbAccess.updateOne(newData);
    let gameUpdated: Game;
    if (sendDataToUpdate === undefined) {
      throw new Error('An error has occurred');
    }
    if (sendDataToUpdate.modifiedCount === 1) {
      gameUpdated = await dbAccess.getOne(newData._id!);
      return gameUpdated;
    }
    return undefined;
  },
};

export default gameManager;
