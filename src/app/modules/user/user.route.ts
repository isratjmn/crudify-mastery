import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

//* Route to create a new user
router.post('/create-user', userControllers.createUser);

//* Route to retrieve all users with specific fields
router.get('/', userControllers.getAllUsers);

//* Route for retrieving a specific user by ID
router.get('/:userId', userControllers.getSingleUserById);

//* Route to update User Information
router.put('/:userId', userControllers.updateUser);

//* Route to Delete a User
router.delete('/:userId', userControllers.deleteUser);

//? Order Management Routes
//? Route to add a new product to a user's order
router.put('/:userId/orders', userControllers.addProductToOrder);

//? Route to retrieve all orders for a specific user
router.get('/:userId/orders', userControllers.getAllOrders);

//? Route to Calculate the total price of all Orders for a specific User
router.get('/:userId/orders/total-price', userControllers.getTotalPrice);

export const UserRoutes = router;
