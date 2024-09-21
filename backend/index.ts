import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import db from "./src/database/db";
import { initRouting } from "./src/routes";
import {initMiddlewares} from "./src/middlewares";

const app = express();

const PORT = 8081;

const corsOptions = {
  origin: ["http://localhost:3000"],
  //Пробовал и квадратных скобок
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`)

  await db.createTables();
  initRouting(app);
  initMiddlewares(app);
})
