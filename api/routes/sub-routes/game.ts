import { Router } from 'express';
import express from 'express';
import gameController from '../../controllers/game';

const routes: Router = express.Router();

routes.get('/', gameController.getAll);
routes.post('/level', gameController.postGame);
routes.get('/:id', gameController.getOne);
routes.put('/update/:id', gameController.updateGame);
routes.delete('/delete/:id', gameController.updateGame);

export default routes;
