import {Application} from "express";
import session from "express-session";
import { authRouter } from './auth.routes';


const initRouting = (app: Application) => {
  app.use('/auth', authRouter);

  // 1) Внимательней, этот код я добавил в /session.middleware.ts
  // 2) route это урл, по которому юзер может постучаться на сервис,
  //    а это middleware - штука, которая вставляется перед тем, как запрос приходит в route,
  //    то есть звено посередине. С помощью middleware можно вставить логику перед всеми запросами,
  //    при этом эта логика обособлена и сама к запросу не относится (например как здесь, создание сессии, которое
  //    добавит объект session в req у всех route)
  //    Это я к тому, что кода ниже не должно здесь быть, ибо это две разные сущности

  // app.use(session({
  //   secret: 'test_key', // Секретный ключ для шифрования данных сессии
  //   resave: false, // Не сохранять данные сессии, если они не изменились
  //   saveUninitialized: true, // Автоматически создавать новую сессию, если она еще не существует
  //   cookie: {
  //     maxAge: 60 * 60 * 1000, // Время жизни сессии в миллисекундах (1 час)
  //     secure: process.env.NODE_ENV === 'production' // Использовать HTTPS в продакшене
  //   }
  // }));
}



export { initRouting };
