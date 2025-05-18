/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlwares/notFound';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import { OrderController } from './app/modules/order/order.controller';

const app: Application = express();

app.post('/api/v1/orders/webhook', express.raw({ type: 'application/json' }), OrderController.StripeWebhook)

// Perser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Application routess
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// Use middlwaer
app.use(globalErrorHandler as (err: any, req: Request, res: Response, next: NextFunction) => void);
app.use(notFound as (req: Request, res: Response, next: NextFunction) => void);

export default app;