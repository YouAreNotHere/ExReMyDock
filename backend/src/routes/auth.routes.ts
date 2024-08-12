import { Router } from 'express';
import AuthController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/signup', AuthController.signup);

// Добавить после успешной авторизации
// (req.session as any).user = user; // user из базы

export { authRouter };
