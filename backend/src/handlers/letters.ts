import 'dotenv/config';
import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import letterRouter from '../controller/letter.controller.js';
import { errorHandler } from '../common/middleware/error.middleware.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/letters', letterRouter);
app.use(errorHandler);

export const handler = serverless(app); 
