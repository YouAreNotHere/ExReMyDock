import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import db from "./src/database/db";
import { initRouting } from "./src/routes";
import {initMiddlewares} from "./src/middlewares";
import {sessionMiddleware} from "./src/middlewares/session.middleware";

const app = express();

const PORT = 8081;

initMiddlewares(app);
initRouting(app);

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`)

  await db.createTables();
})
