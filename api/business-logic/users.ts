import { UserDbAccess, DeleteResponse } from './../data-access/users';
import User from '../models/user';
import { UserDataToUpdate } from '../interfaces/user';

const dbAccess: UserDbAccess = require('../data-access/users');

export interface UserManager {
  getAll(): Promise<User[]>;
  postUser(user: User): Promise<User | void>;
  getOne(id: string): Promise<User>;
  deleteOne(id: string): Promise<DeleteResponse>;
  updateOne(
    newData: UserDataToUpdate,
    file?: Express.Multer.File
  ): Promise<DeleteResponse | undefined>;
}

const userManager: UserManager = {
  postUser: async (user) => {
    return await dbAccess.create(user);
  },
  getAll: async () => {
    return await dbAccess.getAll();
  },
  getOne: async (id) => {
    return await dbAccess.getOne(id);
  },
  deleteOne: async (id) => {
    return await dbAccess.deleteOne(id);
  },
  updateOne: async (newData, file) => {
    let userWithDataUpdated: DeleteResponse | undefined;
    if (file) {
      userWithDataUpdated = await dbAccess.updateOne(newData, file);
    }
    return userWithDataUpdated;
  },
};

module.exports = userManager;
