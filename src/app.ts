/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('The Laivaly server is run successfully')
});

// middlewares
app.use(globalErrorHandler as (err: any, req: Request, res: Response, next: NextFunction) => void)

export default app;