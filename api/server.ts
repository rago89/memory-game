import { Request, Response, Application, NextFunction } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import routes from './routes';
import finalConfig from './config';

const app: Application = express();

app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(
  morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
      flags: 'a',
    }),
  })
);
if (finalConfig.MODE === 'development') {
  app.use(morgan('dev'));
}

finalConfig.STATIC_DIR &&
  app.use(
    '/',
    express.static(path.join(__dirname, '..', finalConfig.STATIC_DIR))
  );

app.use('/api', routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.sendStatus(500).end();
});

export default app;
