import express from 'express';
import { buildRouting } from "./src/routes";
import bodyParser from "body-parser";
import cors from 'cors';
import db from "./src/database/db";

const app = express();

const PORT = 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`)

  await db.createTables();
  buildRouting(app);
})
