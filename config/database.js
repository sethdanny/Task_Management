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
    }
})

export default db;