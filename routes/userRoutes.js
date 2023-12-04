import  express from 'express';
import { getUser, getUsers, registerUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);

export default router;