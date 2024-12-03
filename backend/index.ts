import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './src/database/db';
import { initRouting } from './src/routes';
import { initMiddlewares } from './src/middlewares';
import { sessionMiddleware } from './src/middlewares/session.middleware';
import path from "node:path";
require('dotenv').config();

const app = express();
let PORT: any;
if (process.env.NODE_ENV === "production") {
  PORT = process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}else{
  PORT = 8081;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
      "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// const PORT = 8081;
// app.use(express.static(path.join(__dirname, '../frontend/build')));
//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//   });

initMiddlewares(app);
initRouting(app);

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`);

  await db.createTables();
});
