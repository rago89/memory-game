import { Router } from 'express';
import express from 'express';

import { default as usersRoutes } from './sub-routes/users';

const routes: Router = express.Router();

routes.use('/users', usersRoutes);

export default routes;
