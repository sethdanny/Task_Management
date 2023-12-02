import mysql from 'mysql';
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err) {
        console.log('Mysql database connection failed' + err.stack);
    } else {
        console.log('MYSQL Database connected...'.underline.cyan);
        db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
        (err) => {
            if (err) throw err

            db.query(`USE ${process.env.DB_NAME}`, (err) => {
                if (err) throw err;

                const createTasksTableQuery = `CREATE TABLE IF NOT EXISTS tasks (
                    task_id INT PRIMARY KEY AUTO_INCREMENT,
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    status VARCHAR(20) DEFAULT 'todo',
                    user_id INT,
                    CONSTRAINT fk_user
                    FOREIGN KEY (user_id) REFERENCES users(user_id)
                )`;

                const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
                    user_id INT PRIMARY KEY AUTO_INCREMENT,
                    firstName VARCHAR(50) NOT NULL,
                    lastName VARCHAR(50) NOT NULL,
                    email VARCHAR(50) UNIQUE NOT NULL,
                    mobile VARCHAR(50),
                    password VARCHAR(255)
                )`;

                db.query(createUsersTableQuery, (err) => {
                    if (err) throw err;
                    console.log('User table created or already exists');
                });
                db.query(createTasksTableQuery, (err) => {
                    if (err) throw err;
                    console.log('task  table created or already exists');
                });
            })
        })
    }
})

export default db;