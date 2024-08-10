import { Request, Response } from 'express';
import AuthService from "../services/auth.service";

class AuthController {
  public async signup(req: Request, res: Response) {

    const existingUser = await AuthService.getUserByName(req.body);
    if ((existingUser?.rows as any)?.length) {
      res.status(409).send({message: 'Пользователь уже существует'});
      return;
    }

    const result = await AuthService.signup(req.body);
    if (result === 'error') {
      res.status(500).send({message: 'Что-то пошло не так'});
      return;
    }

    console.log(`user with name ${req.body.name} was created`)
    res.send();
  }
}

export default new AuthController();
