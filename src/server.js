import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnv } from './utils/getEnv.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import router from './routers/index.js';

export const setupServer = () => {
  const app = express();
  // app.use((req, res, next) => {
  //   console.log(`Incoming request: ${req.method} ${req.url}`);
  //   next();
  // });
  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });
  app.use(router);
  app.use('/api-docs', swaggerDocs());
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const port = Number(getEnv('PORT', 3000));
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
