import  express from 'express';
import { createTask, findTask, getTasks } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', findTask);


export default router;