import { Router } from 'express';
import {createUser} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/create', (req, res) => {
  console.log(req.body);



  res.send('poshel nahuyu');
});

export { authRouter };
