import { Router } from 'express';
import {createTodo} from "../controllers/todo.controller";

const authRouter = Router();

authRouter.post('/create', (req, res) => {
    console.log(req.body);



    res.send('Dobavil todo');
});

export { todoRouter };