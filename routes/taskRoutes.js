import  express from 'express';
import { createTask, deleteTask, findTask, getTasks, updatedTaskData } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', findTask);
router.put('/:id', updatedTaskData);
router.delete('/:id', deleteTask);


export default router;