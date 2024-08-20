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

  public async signin(req: Request, res: Response){

    const existingUser = await AuthService.getUserByName(req.body);

    if (!(existingUser?.rows as any)?.length) {
      res.status(409).send({message: 'Пользователь не найден'});
      return;
    }

    const result = await AuthService.signin(req.body);
    if (result === 'error') {
      res.status(500).send({message: 'Что-то пошло не так'});
      return;
    }

    console.log("Well done! U have access to ur account.")
    res.send(result);
  }
}

export default new AuthController();
