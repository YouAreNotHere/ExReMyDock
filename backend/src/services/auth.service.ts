import db from "../database/db";
import bcrypt from 'bcrypt';

class AuthService {
  public async signup(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const query = `INSERT INTO users (name, password) VALUES ("${user.name}", "${hashedPassword}");`;

    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in AuthService.signup: ', error)
      return 'error';
    }
  }

  public async signin(user: any){
    const {name, password} = user;

    try {
      if (!name || !password) {
        console.log("Error. Not enough data");
        return "error"
      }

      const requestUserToDB = `SELECT * FROM users WHERE name = "${name}"`;
      const queryUser: any = await db.query(requestUserToDB);

      //У меня получается 2 проверки на существование юзера, сначала без этой проверки не работал код
      //почему-то, потом нужно проверить, лишнее удалить.

      const isPasswordValid = await bcrypt.compare(password, queryUser.rows[0].password);

      if (!isPasswordValid) {
        console.log("Error. Incorrect password");
        return "error"
      }

      return { user_id: queryUser.rows[0].id }

    }catch(err){
        console.log(err);
        return "error"
      }
    }


  public async getUserByName(user: any) {
    const query = `SELECT * FROM users WHERE name = "${user.name}"`;

    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in AuthService.getUserByName: ', error)
    }
  }
}

export default new AuthService();
