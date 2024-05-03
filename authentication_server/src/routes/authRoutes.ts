
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

const router = Router();

const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService);



router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refreshToken);

export default router;
