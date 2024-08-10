import { Router } from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController';

const router = Router();

// Ruta para registro de usuario
router.post('/register', registerUser);

// Ruta para inicio de sesión
router.post('/login', loginUser);

export default router;
