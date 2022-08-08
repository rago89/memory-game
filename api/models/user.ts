import { ObjectId } from 'mongodb';

type Image = {
  data: string;
  contentType: string;
};

export default class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public gameLevel?: string,
    public avatar?: Image,
    public _id?: ObjectId,
    public updateDate?: Date
  ) {}
}
