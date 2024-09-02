import { Request, Response } from 'express';
import TodosService from "../services/todos.service";
import AuthService from "../services/auth.service";

class TodosController {
    public async getTodos (req: Request, res: Response){
        const result = await TodosService.getTodosByUserId(req.body);
        if (!(result?.rows as any)?.length) {
            res.status(404).send({message: 'Тудушек не найдено'});
            return;
        }
        console.log("Тудушки найдены");
        res.send(result);
    }

    public async addTodo(req: Request, res: Response){
        const result = await TodosService.addTodo(req.body);
        if (result === 'error') {
            res.status(500).send({message: 'Что-то пошло не так'});
            return;
        }

        console.log(`Todo with text ${req.body.text} was added`)
        res.send();
    }
}


export default new TodosController();