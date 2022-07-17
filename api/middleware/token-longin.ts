const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
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
  const authHeader = req.headers['authorization'];
  const token: string | undefined = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res
      .status(401)
      .json({ message: 'validation error, make sure you are registered!' });
    return;
  }

  jwt.verify(token, process.env['ACCESS_TOKEN_SECRET'], (error: any) => {
    if (error) {
      res.status(403).json(error.message);
      return;
    }
    next();
  });
};

module.exports = tokenChecker;
