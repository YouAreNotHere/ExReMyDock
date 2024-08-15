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

      //if (!queryUser.length) {
       // console.log("Error. Incorrect username");
       // return "error"
     // }

      const isPasswordValid = await bcrypt.compare(password, queryUser[0].password);

      if (!isPasswordValid) {
        console.log("Error. Incorrect password");
        return "error"
      }

      return { success: true }

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
