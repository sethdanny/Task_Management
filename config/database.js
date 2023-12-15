import mysql from 'mysql2';
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config()

const db = mysql.createPool({
    host: process.env.DB_HOST || 'mysql-db',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    charset: 'utf8mb4',
    waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

export async function initDatabase() {
  try {
    await db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await db.query(`USE ${process.env.DB_NAME}`);

    await createUsersTable();
    await createTasksTable();

    console.log('Connected to MYSQL Database successfully.'.underline.red);
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1);
  }
}

async function createUsersTable() {
  const query = `CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    mobile VARCHAR(50),
    password VARCHAR(255)
  )`;

  await db.query(query);
}

async function createTasksTable() {
  const query = `CREATE TABLE IF NOT EXISTS tasks (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'todo',
    dueDate DATE,
    user_id INT,
    CONSTRAINT fk_user
      FOREIGN KEY (user_id) REFERENCES users(user_id)
      ON DELETE CASCADE
  )`;

  await db.query(query);
}

export default db;
