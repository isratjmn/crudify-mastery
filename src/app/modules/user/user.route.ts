import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// Will Call Controller Function
router.post('/create-user', userControllers.createUser);

router.get('/', userControllers.getAllUsers);

router.get('/:userId', userControllers.getSingleUserById);

export const UserRoutes = router;
