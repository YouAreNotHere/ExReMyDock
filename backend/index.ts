import express from 'express';
import mysql from 'mysql2';
import { buildRouting } from "./src/routes";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();

const PORT = 8081;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test2007',
});

connection.connect(function(err){
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

buildRouting(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
