import  express from 'express';
import cacheMiddleWare from '../utils/cache.js';
import authenticate from '../middlewares/authMiddleware.js';
import {
    deleteUser,
    getUser,
    getUsers,
    registerUser,
    updateUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/:id', authenticate, cacheMiddleWare, getUser);
router.get('/', authenticate, cacheMiddleWare, getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;