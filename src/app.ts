/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors({origin: ['http://localhost:3000'], credentials: true}));
app.use(cookieParser())

// Application routes
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('The Laivaly server is run successfully')
});

// middlewares
app.use(globalErrorHandler as (err: any, req: Request, res: Response, next: NextFunction) => void);
// Invalid Api
app.use(notFound as (req: Request, res: Response) => void);

export default app;