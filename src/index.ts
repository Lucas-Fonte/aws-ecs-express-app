require('dotenv').config();

import 'reflect-metadata';

import mongoose from 'mongoose';
import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import Router from './routes';
import dbConfig from './config/database';
const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.use(Router);

mongoose
  .connect(dbConfig.url)
  .then((_connection) => {
    console.log('> Successfully connected to database!');
    app.listen(PORT, () => {
      console.log('> Server is running on port', PORT);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to db', err);
    process.exit(1);
  });
