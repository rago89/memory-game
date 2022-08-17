import { Request, Response, NextFunction } from 'express';
import { hashCreator } from '../utils/hashCreator';
import jwt, { Secret } from 'jsonwebtoken';
import validator from 'validator';
import * as dotenv from 'dotenv';
import databaseAccess from '../data-access/users';

export interface LoginController {
  logUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export const SECRET_KEY: Secret = process.env['ACCESS_TOKEN_SECRET'] as string;

const loginController: LoginController = {
  logUser: async (req, res, next) => {
    try {
      dotenv.config();
      const { email } = req.body;
      // check if email is well formatted
      if (!validator.isEmail(email)) {
        res.status(400).json('You have to enter a valid mail');
        return;
      }
      // check if user do not enter the password
      const password = hashCreator(req.body.password);
      const hashEmpty = hashCreator('');
      if (password === hashEmpty) {
        res.status(400).json('password is required');
        return;
      }
      // check if user do not enter the email
      if (!email) {
        res.status(401).json('email is required');
        return;
      }
      // check if user exist
      console.log(password);

      const userRegistered = await databaseAccess.findUserLog(email, password);

      if (!userRegistered) {
        res.status(401).json('You need to register to login');
        return;
      }
      const user = {
        userId: userRegistered._id,
        userName: userRegistered.name,
        userEmail: userRegistered.email,
      };

      const token = jwt.sign(user, SECRET_KEY);
      console.log(token);
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  },
};

export default loginController;
