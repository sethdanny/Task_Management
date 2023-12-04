import  express from 'express';
import { getUser, getUsers, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/:id', getUser);
router.get('/', getUsers);

export default router;