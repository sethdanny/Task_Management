import  express from 'express';
import authenticate from '../middlewares/authMiddleware.js';
import cacheMiddleWare from '../utils/cache.js';
import { createTask,
    deleteTask,
    findTask,
    getTasks,
    updatedTaskData
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', authenticate, cacheMiddleWare, getTasks);
router.post('/', authenticate, createTask);
router.get('/:id', authenticate, cacheMiddleWare, findTask);
router.put('/:id', authenticate, updatedTaskData);
router.delete('/:id', authenticate, deleteTask);


export default router;