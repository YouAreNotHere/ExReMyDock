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

    // declare module "express-session" {
    //   interface SessionData {
    //     user: User;
    //   }
    // }

    const existingUser = await AuthService.getUserByName(req.body);

    // 1) Пробел между user и двоеточием не нужен
    // 2) тип (:any) ты ставишь при объявлении объекта, а не при присванивании (=)
    // 3) req.session.user нужно присвоить после успешной авторизации, то есть после if-ов с ошибками

    // Закинь в этот if проверку на пароль
    if (!(existingUser?.rows as any)?.length) {
      // Для проблем с аутентификацией используй статус 401
      res.status(401).send({message: 'Неверный логин или пароль'});
      return;
    }

    const result = await AuthService.signin(req.body);
    if (result === 'error') {
      res.status(500).send({message: 'Что-то пошло не так'});
      return;
    }

    // Проблему с типом existingUser позже исправим
    req.session.user  = {
      id: (existingUser as any).rows[0].id,
      name: (existingUser as any).rows[0].name,
    };

    // Этот лог идет в логи бэка, тут нужно вписывать скорее факт завершенного действия, чем сообщение пользователю
    console.log(`Пользователь ${(existingUser as any).rows[0].name} авторизован`)

    // Редирект будет происходить на стороне клиента
    // res.redirect('/todos');
    res.send();

    // А этот лог смотрится скорее как ненужный
  }
}

export default new AuthController();
