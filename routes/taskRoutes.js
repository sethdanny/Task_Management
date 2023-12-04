import  express from 'express';
import authenticate from '../middlewares/authMiddleware.js';
import { createTask,
    deleteTask,
    findTask,
    getTasks,
    updatedTaskData
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', authenticate, getTasks);
router.post('/', authenticate, createTask);
router.get('/:id', findTask);
router.put('/:id', authenticate, updatedTaskData);
router.delete('/:id', authenticate, deleteTask);


export default router;