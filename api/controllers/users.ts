import { UserManager } from './../business-logic/users';
import {
  UserDataToUpdate,
  UserIncomingData,
  ReturnedUserAfterCreation,
} from 'api/interfaces/user';
import User from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { hashCreator } from '../utils/hashCreator';
const userManager: UserManager = require('../business-logic/users');
import { DeleteResponse } from '../data-access/users';
import checkPasswords from '../utils/check-passwords';
import checkEmails from '../utils/check-emails';
import checkParamAndBodyIds from '../utils/check-ids';
import multer from 'multer';
import { deleteImageAsync } from '../utils/delete-image';
const upload = multer().single('avatar');

export interface UserController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  postUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  getOne(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteOne(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const usersController: UserController = {
  getAll: async (req, res, next) => {
    try {
      const users: User[] = await userManager.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  postUser: async (req, res, next) => {
    try {
      const newUserData: UserIncomingData = req.body;
      if (!newUserData.email || !newUserData.name || !newUserData.password) {
        return;
      }
      const passwordHashed = hashCreator(newUserData.password);
      newUserData.password = passwordHashed;

      const user: ReturnedUserAfterCreation | void = await userManager.postUser(
        newUserData
      );
      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === 11000) {
        res
          .status(400)
          .json({ message: `Email: ${error.keyValue.email} Already Exist` });
      }
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send("'id' is required");
        return;
      }
      const user = await userManager.getOne(id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deleteOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send("'id' is required");
        return;
      }
      const response: DeleteResponse = await userManager.deleteOne(id);

      if (response.acknowledged === true && response.deletedCount === 1) {
        res
          .status(200)
          .json({ message: `User id:${id} was removed successfully` });
        return;
      }
      res
        .status(500)
        .json({ message: 'An Error has occurred try again later' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData: UserDataToUpdate = req.body;
      // checkIds
      checkParamAndBodyIds(id, newData._id);
      upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          throw new Error(error.message);
        } else if (error) {
          // An unknown error occurred when uploading.
          next(error);
        }
        // Everything went fine.
      });
      const user: User = await userManager.getOne(id);
      if (!user) {
        throw new Error(
          `Cannot update user, user with the given id:${newData._id} doesn't exist`
        );
      }
      // check old password before update the newOne
      if (newData.newPassword && newData.oldPassword) {
        newData.password = checkPasswords(
          newData.oldPassword,
          newData.newPassword,
          user
        );
      }
      // check if user update the email
      if (newData.currentEmail && newData.newEmail) {
        newData.email = checkEmails(
          newData.currentEmail,
          newData.newEmail,
          user
        );
      }
      // if there is an image uploaded
      if (req.file !== undefined) {
        await userManager.updateOne(newData, req.file);
        const userToSend = {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
        };
        res.status(200).send(userToSend);
        return;
      }
      await userManager.updateOne(newData);
      const userToSend = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
      };

      res.status(200).send(userToSend);
    } catch (error) {
      // if any error ,make sure multer doesn't store image
      if (req.file) {
        await deleteImageAsync(req.file.filename, 'avatar-uploads');
      }
      next(error);
    }
  },
};

module.exports = usersController;
