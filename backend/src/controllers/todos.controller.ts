import { Request, Response } from 'express';
import TodosService from "../services/todos.service";

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
}


export default new TodosController();