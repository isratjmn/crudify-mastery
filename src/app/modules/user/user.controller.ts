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
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      message: 'Failed to fetch user!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUserById,
  deleteUser,
};
