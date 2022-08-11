import { Router } from 'express';
import express from 'express';
import gameController from '../../controllers/game';

const routes: Router = express.Router();

routes.post('/level', gameController.postGame);
routes.get('/:id', gameController.getOne);
routes.put('/:id', gameController.updateGame);

export default routes;
