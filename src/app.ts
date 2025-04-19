/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import notFound from './app/middlwares/notFound';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();

// Perser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// Use middlwaer
app.use(globalErrorHandler as (err: any, req: Request, res: Response, next: NextFunction) => void);
app.use(notFound as (req: Request, res: Response, next: NextFunction) => void);

export default app;