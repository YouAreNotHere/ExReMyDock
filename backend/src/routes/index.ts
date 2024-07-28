import {Application} from "express";

import { authRouter } from './auth.routes';

const buildRouting = (app: Application) => {
  app.use('/auth', authRouter);
}

export { buildRouting };
