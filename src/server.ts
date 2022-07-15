import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import * as path from 'path';
import { toDoRouter } from '../routes';

const connectToDatabase = require('../database');
const serverless = require('serverless-http');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  throw new Error('ATLAS_URI must be defined');
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    console.log('Connected to Database');
    // start Express server
    app.listen(5200, () => {
      console.log('Server started on port 5200!');
    });
  })
  .catch((err: any) => {
    console.error(err);
  });

const app = express();
const apiRoute = '/.netlify/functions/server/todos';
app.use(cors());

// Add routes
app.use(apiRoute, toDoRouter);

module.exports = app;
module.exports.handler = serverless(app);
