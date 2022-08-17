import { UpdatedUser, CreatedUser } from './../interfaces/user';
import { DeleteResponse, UpdateResponse } from './../data-access/users';
import User from '../models/user';
import { UserDataToUpdate } from '../interfaces/user';
import { compressSharpAvatar } from '../utils/sharp';
import { deleteImageAsync } from '../utils/delete-image';

import { default as dbAccess } from './../data-access/users';

export interface UserManager {
  getAll(): Promise<User[]>;
  postUser(user: User): Promise<CreatedUser | void>;
  getOne(id: string): Promise<User>;
  deleteOne(id: string): Promise<DeleteResponse>;
  updateOne(
    id: string,
    newData: UserDataToUpdate,
    file?: Express.Multer.File
  ): Promise<UpdatedUser | {}>;
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
  updateOne: async (id, newData, file) => {
    if (file) {
      const imageCompressed: Buffer = await compressSharpAvatar(file.path);
      const pictureResized = {
        data: imageCompressed.toString('base64'),
        contentType: file.mimetype,
      };
      newData.avatar = pictureResized;
      await deleteImageAsync(file.filename, 'avatar-uploads');
    }

    const updateUser: UpdateResponse | undefined = await dbAccess.updateOne(
      id,
      newData
    );

    if (updateUser?.modifiedCount === 1) {
      const user: User = await dbAccess.getOne(id);
      const updatedUser: UpdatedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        updateDate: user.updateDate,
      };
      return updatedUser;
    }
    return {};
  },
};

export default userManager;
