import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// Will Call Controller Function
router.post('/create-user', userControllers.createUser);

router.get('/', userControllers.getAllUsers);

router.get('/:userId', userControllers.getSingleUserById);

router.put('/:userId', userControllers.updateUser);

router.delete('/:userId', userControllers.deleteUser);

router.put('/:userId/orders', userControllers.addProductToOrder);

router.get('/:userId/orders', userControllers.getAllOrders);

// router.get('/:userId/orders/total-price', calculateTotalPriceController);

export const UserRoutes = router;
