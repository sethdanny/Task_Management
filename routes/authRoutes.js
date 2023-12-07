import  express from 'express';
import { login, logout, refreshToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.post('/logout', logout);

export default router;