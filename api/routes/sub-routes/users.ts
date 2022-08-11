import { Router } from 'express';
import express from 'express';
import upload from '../../middleware/multer-avatar';
import usersController from './../../controllers/users';

const routes: Router = express.Router();

routes.post('/register', usersController.postUser);
routes.get('/', usersController.getAll);
routes.get('/:id', usersController.getOne);
routes.put('/:id', upload.single('avatar'), usersController.updateUser);
routes.delete('/:id', usersController.deleteOne);

export default routes;
