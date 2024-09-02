import { Router } from 'express';
import TodosController from "../controllers/todos.controller";

const todosRouter = Router();

todosRouter.get('/getTodos', TodosController.getTodos);
todosRouter.post('/addTodo', TodosController.addTodo);

export { todosRouter };