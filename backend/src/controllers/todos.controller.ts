import { Request, Response } from 'express';
import TodosService from '../services/todos.service';

class TodosController {
  public async getTodos(req: Request, res: Response) {
    const userId = req.session.user?.id;
    if (!userId) res.redirect('auth');

    const result: any = await TodosService.getTodosByUserId(Number(userId));
    console.log(result.rows);
    if (!(result?.rows as any)?.length) {
      res.status(200).send({ message: 'Тудушек не найдено' });
      return;
    }
    console.log('Тудушки отправлены на фронт');
    res.send(result.rows);
  }

  public async addTodo(req: Request, res: Response) {
    console.log(req.body);
    const result = await TodosService.addTodo(req.body);
    if (result === 'error') {
      res
        .status(500)
        .send({ message: 'При добавлении туду что-то пошло не так' });
      return;
    }

    console.log(`Todo with text ${req.body.text} was added`);
    res.send();
  }

  public async deleteTodo(req: Request, res: Response) {
    const { id } = req.body;
    const result = await TodosService.deleteTodo(id);
    if (result === 'error') {
      res
        .status(500)
        .send({ message: 'При удалении туду что-то пошло не так' });
      return;
    }

    console.log(`Todo with ${id} was deleted`);
    res.send();
  }

  public async completeTodo(req: Request, res: Response) {
    const result = await TodosService.completeTodo(req.body);
    if (result === 'error') {
      res
        .status(500)
        .send({ message: 'При завершеннии туду что-то пошло не так' });
      return;
    }

    console.log(`Todo with ${req.body.id} is completed`);
    res.send();
  }

  public async saveEditedTodo(req: Request, res: Response) {
    const result = await TodosService.saveEditedTodo(req.body);
    if (result === 'error') {
      res
        .status(500)
        .send({
          message: 'При сохранении изменяемой тудушки что-то пошло не так',
        });
      return;
    }

    console.log(`Todo with text "${req.body.text}" is completed`);
    res.send();
  }
}

export default new TodosController();
