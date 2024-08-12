import {Application} from "express";
import {sessionMiddleware} from "./session.middleware";

const initMiddlewares = (app: Application) => {
  sessionMiddleware(app);
};

export {initMiddlewares};
