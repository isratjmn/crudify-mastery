/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
// import { validateUser } from './user.validation';

//* 1. Create a new User

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body;
    // Check if the user.hobbies is an array. If not, make it an array.
    const hobbies = Array.isArray(user.hobbies) ? user.hobbies : [user.hobbies];
    const validateData = userValidationSchema.parse(user);
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
      error: error,
    });
  }
};

//* 2. Get All User Data
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
      error: error,
    });
  }
};

//* 3. Get a User by Id
const getSingleUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserServices.getUserByIdFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: {
        userId: user.userId,
        username: user.username,
        fullName: user.fullName,
        age: user.age,
        email: user.email,
        isActive: user.isActive,
        hobbies: user.hobbies,
        address: user.address,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: error,
    });
  }
};

//* 4. Update a User by userId
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;
    const result = await UserServices.updateUserInDB(
      Number(userId),
      updatedUserData
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to Update User!',
      error: error,
    });
  }
};

//* 5. Delete a User by userId
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to Delete User!',
      error: error,
    });
  }
};

//? 1. Add an Order to a User
const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;
    await UserServices.addProductToOrder(parseInt(userId), orderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to add product to Order!',
      error: error,
    });
  }
};

//? 2. Get orders of a User
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
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to Fetch Orders',
      error: error,
    });
  }
};

//? 3. Calculate the total price of orders of a user
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalPrice = await UserServices.calculateTotalPrice(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: Number(totalPrice.toFixed(2)),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: error,
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
  getTotalPrice,
};
