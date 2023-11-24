/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { validateUser } from './user.validation';

// Controller function for creating a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    // Check if the user.hobbies is an array. If not, make it an array.
    const hobbies = Array.isArray(userData.hobbies)
      ? userData.hobbies
      : [userData.hobbies];

    const validateData = validateUser(userData);
    // Create user in the database
    const result = await UserServices.createUserIntoDB({
      ...validateData,
      hobbies,
    });
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users Fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to Fetch users!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

// Get a user by id
const getSingleUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const result = await UserServices.getUserByIdFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User is Retrive successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch users!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};
// Controller for updating a User by userId
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;
    
    const result = await UserServices.updateUserInDB(Number(userId), updatedUserData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to Update User!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

// Delete a User by userId
const deleteUser = async (req: Request, res: Response) => {
  try {
    // Get the user id from the request params
    const { userId } = req.params;
    await UserServices.deleteUserFromDB(Number(userId));

    // Send the response
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to Delete user!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;

    const orderData = {
      productName,
      price,
      quantity,
    };

    await UserServices.addProductToOrder(parseInt(userId), orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to add product to order!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await UserServices.getAllOrdersForUser(parseInt(userId, 10));

    res.status(200).json({
      success: true,
      message: 'Orders Fetched successfully!',
      data: {
        orders,
      },
    });
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: 'Failed to fetch orders',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUserById,
  updateUser,
  deleteUser,
  addProductToOrder,
  getAllOrders,
};
