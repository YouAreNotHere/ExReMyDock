import { Router } from 'express';
import TodosController from "../controllers/todos.controller";

const todosRouter = Router();

todosRouter.post('/getTodos', TodosController.getTodos);
todosRouter.post('/addTodo', TodosController.addTodo);

export { todosRouter };