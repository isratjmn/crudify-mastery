import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// Will Call Controller Function
router.post('/create-user', userControllers.createUser);

router.get('/', userControllers.getAllUsers);

router.get('/:userId', userControllers.getSingleUserById);

router.delete('/:userId', userControllers.deleteUser);

export const UserRoutes = router;
