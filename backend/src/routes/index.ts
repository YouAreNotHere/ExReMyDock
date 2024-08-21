import {Application} from "express";
import session from "express-session";
import { authRouter } from './auth.routes';


const initRouting = (app: Application) => {
  app.use('/auth', authRouter);
  app.use(session({
    secret: 'test_key', // Секретный ключ для шифрования данных сессии
    resave: false, // Не сохранять данные сессии, если они не изменились
    saveUninitialized: true, // Автоматически создавать новую сессию, если она еще не существует
    cookie: {
      maxAge: 60 * 60 * 1000, // Время жизни сессии в миллисекундах (1 час)
      secure: process.env.NODE_ENV === 'production' // Использовать HTTPS в продакшене
    }
  }));
}



export { initRouting };
