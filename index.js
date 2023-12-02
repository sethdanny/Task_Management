import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import dbConnect from './config/database.js';


const app = express();
dotenv.config();
const port = process.env.PORT || 5001;

dbConnect();


app.get('/', (req, res) => {
    res.send('Welcome to task management API');
});

app.use(express.json());
app.use(morgan('dev'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`.underline.cyan);
});