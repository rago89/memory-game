import { Router } from 'express';
import express from 'express';

import { default as usersRoutes } from './sub-routes/users';
import { default as gameRoutes } from './sub-routes/game';

const routes: Router = express.Router();

routes.use('/users', usersRoutes);
routes.use('/games', gameRoutes);

export default routes;
