import db from "../database/db";

class TodosService {
    public async getTodosByUserId(userId: number){
        const query = `SELECT * FROM todos WHERE id = "${userId}"`;
        try {
            return await db.query(query);
        } catch (error) {
            console.error('Error in TodosService.getTodosByUserId: ', error)
        }
    }

    public async addTodo(newTodo: any){
        const query = `INSERT INTO todos (user_id, text, status) VALUES ("${newTodo.userId}", "${newTodo.text}", "${newTodo.status}");`;
        try {
            return await db.query(query);
        } catch (error){
            console.error("Error in TodosService.addTodo:", error);
            return "error"
        }
    }
}

export default new TodosService();