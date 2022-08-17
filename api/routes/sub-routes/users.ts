import { Router } from 'express';
import express from 'express';
import upload from '../../middleware/multer-avatar';
import usersController from './../../controllers/users';
import tokenChecker from '../../middleware/token-login';

const routes: Router = express.Router();

routes.post('/register', usersController.createUser);
routes.get('/', tokenChecker, usersController.getAll);
routes.get('/:id', tokenChecker, usersController.getOne);
routes.put(
  '/update/:id',
  tokenChecker,
  upload.single('avatar'),
  usersController.updateUser
);
routes.delete('/delete/:id', tokenChecker, usersController.deleteOne);

export default routes;
