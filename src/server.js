import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import cookieParser from 'cookie-parser';

import { getEnv } from './utils/getEnv.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import router from './routers/index.js';
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
  const app = express();
  app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
  app.use(
    cors({
      origin: [
        'https://water-tracker-sand.vercel.app',
        'http://localhost:5173',
      ],
      credentials: true,
    }),
  );
  // app.use(cookieParser());
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
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const port = Number(getEnv('PORT', 3000));
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
