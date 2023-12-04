import  express from 'express';
import {
    deleteUser,
    getUser,
    getUsers,
    registerUser,
    updateUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;