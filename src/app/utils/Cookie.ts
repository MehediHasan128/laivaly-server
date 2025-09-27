import config from '../config';
import { catchAsync } from './catchAsync';
import express from 'express';
import { sendResponce } from './sendResponce';

const router = express.Router();
const isProduction = config.node_env === 'production';

export const removeData = router.post(
  '/remove',
  catchAsync(async (req, res) => {
    const cookieName = req.body.cookieName;
    // clear cookie
    res.cookie(`${cookieName}`, '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 0,
    });

    sendResponce(res, {
      statusCode: 200,
      success: true,
      message: '',
      data: null,
    });
  }),
);
