import db from '../database/db';

class TodosService {
  public async getTodosByUserId(userId: number) {
    const query = `SELECT * FROM todos WHERE user_id = "${userId}"`;
    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in TodosService.getTodosByUserId: ', error);
    }
  }

  public async addTodo(newTodo: any, userId: number) {
    const query = `INSERT INTO todos (user_id, text, completed) VALUES ("${userId}", "${newTodo.text}", ${newTodo.completed});`;
    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in TodosService.addTodo:', error);
      return 'error';
    }
  }

  public async deleteTodo(todoId: any) {
    const query: string = `DELETE FROM todos WHERE id = "${todoId}";`;
    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in TodosService.deletTodo:', error);
      return 'error';
    }
  }

  public async completeTodo(idAndCompleted: any) {
    const { id, completed } = idAndCompleted;
    const query: string = `UPDATE todos SET completed = ${completed} WHERE id = "${id}";`;
    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in TodosService.deletTodo:', error);
      return 'error';
    }
  }

  public async saveEditedTodo(idAndText: any) {
    const { id, text } = idAndText;
    const query: string = `UPDATE todos SET text = "${text}" WHERE id = "${id}";`;
    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in TodosService.deletTodo:', error);
      return 'error';
    }
  }
}

export default new TodosService();
