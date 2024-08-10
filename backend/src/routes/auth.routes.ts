import { Router } from 'express';
import AuthController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/create', AuthController.signup);

export { authRouter };
