import  express from 'express';
import { getUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/:id', getUser);

export default router;