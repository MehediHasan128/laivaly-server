/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlwares/globalErrorHandler';

const app: Application = express();

// Perser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Use middlwaer
app.use(globalErrorHandler as (err: any, req: Request, res: Response, next: NextFunction) => void);

export default app;