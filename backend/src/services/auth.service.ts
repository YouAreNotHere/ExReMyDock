import db from "../database/db";

class AuthService {
  public async signup(user: any) {
    const query = `INSERT INTO users (name, password) VALUES ("${user.name}", "${user.password}");`;

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
      console.error('Error in AuthService.checkExistingUser: ', error)
    }
  }
}

export default new AuthService();
