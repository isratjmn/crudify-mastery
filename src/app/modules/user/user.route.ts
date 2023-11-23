import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// Will Call Controller Function
router.post('/create-user', userControllers.createUser);

export const UserRoutes = router;
