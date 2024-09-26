import db from '../database/db';
import bcrypt from 'bcrypt';

class AuthService {
  public async signup(user: any) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const query = `INSERT INTO users (name, password) VALUES ("${user.name}", "${hashedPassword}");`;

    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in AuthService.signup: ', error);
      return 'error';
    }
  }

  public async signin(user: any) {
    try {
      const queryUser: any = await this.getUserByName(user);
      if (!queryUser.rows[0]) {
        console.log('Пользовательне найден');
        return false;
      }
      const isPasswordValid = await bcrypt.compare(
        user.password,
        queryUser.rows[0].password,
      );

      if (isPasswordValid) {
        return { userId: queryUser.rows[0].id };
      } else {
        console.log('Ошибка. Неверный пароль!');
        return false;
      }
    } catch (err) {
      console.log(err);
      return 'error';
    }
  }

  public async getUserByName(user: any) {
    const query = `SELECT * FROM users WHERE name = "${user.name}"`;

    try {
      return await db.query(query);
    } catch (error) {
      console.error('Error in AuthService.getUserByName: ', error);
    }
  }

  public async checkIsValidCredentials(user: any) {
    const { name, password } = user;
    const queryUser: any = await this.getUserByName(user);

    if (!(queryUser?.rows as any)?.length) {
      console.log('Error. Incorrect username');
      return false;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      queryUser.rows[0].password,
    );

    if (!isPasswordValid) {
      console.log('Error. Incorrect password');
      return false;
    }

    return queryUser.rows[0].id;
  }
}

export default new AuthService();
