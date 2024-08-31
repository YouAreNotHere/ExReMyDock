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
}

export default new TodosService();