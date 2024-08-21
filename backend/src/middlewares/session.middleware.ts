import session from "express-session";
import {Application} from "express";

const sessionMiddleware = (app: Application) => {
  app.use(session({
    secret: 'your_secret_key', // Уникальный ключ для шифрования сессии
    resave: false, // Не сохранять сессию, если она не изменилась
    store: new session.MemoryStore(), // Хранилище для сессий
    saveUninitialized: true, // Автоматически сохранять новые сессии
    cookie: {
      maxAge: 60 * 60 * 1000, // Время жизни сессии в миллисекундах
    },
  }));

  // Это примерная реализация, ее надо будет поправить

  // app.use((req, res, next) => {
  //   if (!req.session.user) {
  //     res.status(401);
  //   }
  //   next();
  // });
};

export {sessionMiddleware};
