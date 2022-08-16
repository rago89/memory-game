import { Router } from 'express';
import express from 'express';
import upload from '../../middleware/multer-avatar';
import usersController from './../../controllers/users';

const routes: Router = express.Router();

routes.post('/register', usersController.createUser);
routes.get('/', usersController.getAll);
routes.get('/:id', usersController.getOne);
routes.put('/update/:id', upload.single('avatar'), usersController.updateUser);
routes.delete('/delete/:id', usersController.deleteOne);

export default routes;
