import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

/**
 *
 * Checks the token created while user login.
 *
 * @returns Rejection error if token no valid.
 */

const tokenChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    dotenv.config();
    const authHeader = req.headers['authorization'];
    const token: string | undefined = authHeader && authHeader.split(' ')[1];
    if (!token) {
      res
        .status(401)
        .json({ message: 'validation error, make sure you are registered!' });
      return;
    }

    jwt.verify(
      token,
      process.env['ACCESS_TOKEN_SECRET'] as string,
      (error: any) => {
        if (error) {
          res.status(403).json(error.message);
          return;
        }
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

export default tokenChecker;
