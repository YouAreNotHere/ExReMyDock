import { Application } from 'express';
import { todosRouter } from './todos.routes';
import { authRouter } from './auth.routes';

const initRouting = (app: Application) => {
  app.use('/auth', authRouter);
  app.use('/todos', todosRouter);
};

export { initRouting };
