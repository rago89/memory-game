import { Request, Response, NextFunction } from 'express';
import gameManager from '../business-logic/game';
import userManager from '../business-logic/users';
import { ObjectId } from 'mongodb';
import Game from '../models/game';
import userValidator from '../validators/user';
export interface GameController {
  postGame(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getOne(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateGame(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const gameController: GameController = {
  postGame: async (req, res, next) => {
    try {
      const newGame = new Game(req.body.userId, req.body.gameLevel);
      const user = await userManager.getOne(newGame.userId);
      if (!user) {
        res
          .status(400)
          .json(`User with the given id:'${newGame.userId} doesn't exist!'`);
        return;
      }
      const game: Game = await gameManager.getOne(newGame.userId);
      if (game) {
        res
          .status(400)
          .json(
            `Cannot start new game user has already started to play current Level:(${game.gameLevel})`
          );
        return;
      }
      if (newGame.gameLevel > 1) {
        res
          .status(400)
          .json('Cannot start new game user has already started to play');
        return;
      }
      const postGame: Game = await gameManager.postGame(newGame);
      if (Object.keys(postGame).length === 0) {
        res.status(500).json('Message: An error has occurred try again later');
      }
      res.status(201).json(postGame);
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const games: Game[] = await gameManager.getAll();
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      if (!req.params['id']) {
        throw new Error('Id is required');
      }
      const id = req.params['id'];
      const game: Game = await gameManager.getOne(id);
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  },
  updateGame: async (req, res, next) => {
    try {
      const _id = req.params['id'];
      const { userId, gameLevel, gameId } = req.body;
      if (!userValidator.checkParamAndBodyIds(_id, gameId)) {
        throw new Error('Ids do not match');
      }
      const game = new Game(userId, gameLevel, new ObjectId(_id));
      const gameUpdated = await gameManager.updateOne(game);
      res.status(200).json(gameUpdated);
    } catch (error) {
      next(error);
    }
  },
};

export default gameController;
