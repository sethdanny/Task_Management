import  express from 'express';
import { createTask, getTasks } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);


export default router;