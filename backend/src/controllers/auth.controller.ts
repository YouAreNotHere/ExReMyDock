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
    // declare module используются в d.ts файлах
    // https://scriptdev.ru/guide/058/

    // if (!await AuthService.checkIsValidCredentials(req.body)) {
    //   res.status(401).send({message: 'Неверный логин или пароль'});
    //   return;
    // }

    const result = AuthService.signin(req.body);
    console.log(result);

    // Проблему с типом existingUser позже исправим
    // req.session.user  = {
    //   id: (existingUser as any).rows[0].id,
    //   name: (existingUser as any).rows[0].name,
    // };

    console.log(`Пользователь авторизован`)

    res.send({userId: 7});
  }
}

export default new AuthController();
