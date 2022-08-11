import { ObjectId } from 'mongodb';

class Game {
  constructor(
    public userId: string,
    public gameLevel: number,
    public _id?: ObjectId,
    public updateDate?: Date
  ) {}
}

export default Game;
