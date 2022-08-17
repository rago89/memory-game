import { Router } from 'express';
import express from 'express';
import loginController from '../../controllers/login';

const routes: Router = express.Router();

routes.post('/', loginController.logUser);

export default routes;
