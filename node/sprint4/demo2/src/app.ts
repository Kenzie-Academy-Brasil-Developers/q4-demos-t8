import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { errorHandler } from './errors';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import registerRouters from './routes';

const app = express();

app.use(express.json());
registerRouters(app);

app.use(
  '/api-documentation',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(err, res);
});

export default app;
