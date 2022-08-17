import { Router } from 'express';
import express from 'express';

import { default as usersRoutes } from './sub-routes/users';
import { default as gameRoutes } from './sub-routes/game';
import { default as loginRoutes } from './sub-routes/login';

const routes: Router = express.Router();

routes.use('/users', usersRoutes);
routes.use('/games', gameRoutes);
routes.use('/login', loginRoutes);

export default routes;
