import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

// User login api
router.post('/login', AuthController.loginUser);

export const AuthRoutes = router;