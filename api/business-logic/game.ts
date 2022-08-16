import { ObjectId } from 'mongodb';
import { default as dbAccess } from './../data-access/game';
import Game from '../models/game';

export interface GameManager {
  postGame(newGame: Game): Promise<Game>;
  getAll(): Promise<Game[]>;
  getOne(id: ObjectId): Promise<Game>;
  updateOne(game: Game): Promise<Game | {}>;
}

const gameManager: GameManager = {
  postGame: async (newGame) => {
    return await dbAccess.create(newGame);
  },
  getAll: async () => {
    return await dbAccess.getAll();
  },
  getOne: async (id) => {
    return await dbAccess.getOne(id);
  },
  updateOne: async (game) => {
    const sendDataToUpdate = await dbAccess.updateOne(game);
    let gameUpdated: Game;
    if (sendDataToUpdate === undefined) {
      throw new Error('An error has occurred');
    }
    if (sendDataToUpdate.modifiedCount === 1) {
      gameUpdated = await dbAccess.getOne(new ObjectId(game._id!));
      return gameUpdated;
    }
    return {};
  },
};

export default gameManager;
