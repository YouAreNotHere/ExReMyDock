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
