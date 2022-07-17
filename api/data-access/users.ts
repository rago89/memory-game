import { collections } from '../db/database.services';
import { ObjectId } from 'mongodb';
import User from '../models/user';
import {
  ReturnedUserAfterCreation,
  UserDataToUpdate,
} from '../interfaces/user';

export type DeleteResponse = { acknowledged: boolean; deletedCount: number };

export interface UserDbAccess {
  create(user: User): Promise<User | void>;
  getAll(): Promise<User[]>;
  getOne(id: string): Promise<User>;
  updateOne(
    newData: UserDataToUpdate,
    avatar: Express.Multer.File
  ): Promise<any>;
  deleteOne(id: string): Promise<DeleteResponse>;
}
const databaseAccess: UserDbAccess = {
  getAll: async () => {
    const users = (await collections.users?.find().toArray()) as User[];
    return users;
  },
  async create(userData) {
    const result = await collections.users?.insertOne(userData);
    if (result?.insertedId) {
      const user = await this.getOne(result?.insertedId.toString()!);
      const dataToReturn: ReturnedUserAfterCreation = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      return user;
    }
    throw new Error('An error has occurred');
  },
  async getOne(id) {
    const user = (await collections.users?.findOne({
      _id: new ObjectId(id),
    })) as User;
    return user;
  },
  updateOne: async (newData, avatar) => {
    const user = await collections.users?.updateOne(
      { _id: new ObjectId(newData._id) },
      { $set: newData }
    );
    return user;
  },
  async deleteOne(id) {
    const response: DeleteResponse = await collections.users?.deleteOne({
      _id: new ObjectId(id),
    })!;
    return response;
  },
};

module.exports = databaseAccess;
