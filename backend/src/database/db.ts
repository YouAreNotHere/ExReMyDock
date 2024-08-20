import {createPool, Pool} from 'mysql2/promise';

class db {
  private pool: Pool;

  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'YouAreNotHere',
      password: '123456',
      database: 'test_database',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('MySQL pool was created...');
  }

  public async query(sql: string) {
    try {
      const connection = await this.pool.getConnection();
      console.log('MySQL connected...')

      const [rows, fields] = await connection.query(sql);
      connection.release();
      console.log('MySQL released...')

      return { rows, fields };
    } catch (error) {
      console.error(`
        !Error while mysql query. \n
        Error: ${error}.\n
        Query: ${sql}.\n
      `);
    }
  }

  public async close() {
    try {
      await this.pool.end();
      console.log('MySQL connection closed.');
    } catch (error) {
      console.log('Error while closing the connection: ', error);
    }
  }

  public async createTables() {
    await this.createUsersTable();

    console.log('MySQL tables was created');
  }

  private async createUsersTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          password VARCHAR(255) NOT NULL
      );
    `;
    await this.query(sql);
  }

  private async createTodosTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS todos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id NOT NULL,
          text VARCHAR(255) NOT NULL,
          status VARCHAR(100) NOT NULL
      );
    `;
    await this.query(sql);
  }
}

export default new db();
