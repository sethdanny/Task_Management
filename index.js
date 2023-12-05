import db from './config/database.js';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cacheMiddleWare from './utils/cache.js';


const app = express();
dotenv.config();
const port = process.env.PORT || 5001;

async function startServer() {
    try {
        await db;
        app.use(express.json());
        app.use(morgan('dev'));
        app.use(cacheMiddleWare);

        app.use('/api/v1/user', authRoutes);
        app.use('/api/v1/users', userRoutes);
        app.use('/api/v1/tasks', taskRoutes);

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`.underline.cyan);
        });
    } catch (error) {
        console.error('Error initializing the database:', error);
        process.exit(1);   
    }
}

startServer();