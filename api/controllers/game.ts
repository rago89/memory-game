import Game from '../models/game';
import { Request, Response, NextFunction } from 'express';
import gameManager from '../business-logic/game';
export interface GameController {
  postGame(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getOne(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateGame(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const gameController: GameController = {
  postGame: async (req, res, next) => {
    try {
      const newGame: Game = req.body;
      if (newGame.gameLevel > 0) {
        throw new Error(
          'Cannot start new game user has already started to play'
        );
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
  getOne: async (req, res, next) => {},
  updateGame: async (req, res, next) => {},
};

export default gameController;
