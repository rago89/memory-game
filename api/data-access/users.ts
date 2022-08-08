import { UpdatedUser } from './../interfaces/user';
import { collections } from '../db/database.services';
import { ObjectId } from 'mongodb';
import User from '../models/user';
import { CreatedUser, UserDataToUpdate } from '../interfaces/user';

export type DeleteResponse = { acknowledged: boolean; deletedCount: number };
export type UpdateResponse = { acknowledged: boolean; modifiedCount: number };

export interface UserDbAccess {
  create(user: User): Promise<CreatedUser | void>;
  getAll(): Promise<User[]>;
  getOne(id: string): Promise<User>;
  updateOne(
    id: string,
    newData: UserDataToUpdate
  ): Promise<UpdateResponse | undefined>;
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
      const dataToReturn: CreatedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      return dataToReturn;
    }
    throw new Error('An error has occurred');
  },
  async getOne(id) {
    const user = (await collections.users?.findOne({
      _id: new ObjectId(id),
    })) as User;
    return user;
  },
  async updateOne(id, newData) {
    const updateUser = await collections.users?.updateOne(
      { _id: new ObjectId(id) },
      { $set: newData }
    );

    if (updateUser?.modifiedCount === 1) {
      await collections.users?.updateOne(
        { _id: new ObjectId(id) },
        { $set: { updateDate: new Date() } }
      );
    }
    return updateUser;
  },
  async deleteOne(id) {
    const response: DeleteResponse = await collections.users?.deleteOne({
      _id: new ObjectId(id),
    })!;
    return response;
  },
};

export default databaseAccess;
