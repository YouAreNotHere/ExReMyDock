import {Application} from "express";
import {todosRouter} from "./todos.routes";
import { authRouter } from './auth.routes';

const initRouting = (app: Application) => {
  app.use('/auth', authRouter);
  app.use("/todos", todosRouter);

  // 1) Внимательней, этот код я добавил в /session.middleware.ts
  // 2) route это урл, по которому юзер может постучаться на сервис,
  //    а это middleware - штука, которая вставляется перед тем, как запрос приходит в route,
  //    то есть звено посередине. С помощью middleware можно вставить логику перед всеми запросами,
  //    при этом эта логика обособлена и сама к запросу не относится (например как здесь, создание сессии, которое
  //    добавит объект session в req у всех route)
  //    Это я к тому, что кода ниже не должно здесь быть, ибо это две разные сущности
}



export { initRouting };
