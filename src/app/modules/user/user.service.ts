import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExist(user.userId)) {
    throw new Error(`User ${user.userId} already exists`);
  }
  const result = await User.create(user);
  return result;
};

// Service function to get all users
const getAllUsersFromDB = async () => {
  // Fetch users with specified fields using projection
  const users = await User.find(
    {},
    {
      _id: 0,
      userId: 0,
      password: 0,
      isActive: 0,
      hobbies: 0,
      orders: 0,
    }
  );
  if (!users) {
    throw new Error('Failed to Fetch users');
  }
  return users;
};

// Service Function to get a User by Id
const getUserByIdFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

// Service for Update a User by Id
const updateUserInDB = async (userId: number, updatedUserData: TUser) => {
  try {
    const existingUser = await User.findOneAndUpdate(
      { userId },
      updatedUserData,
      { new: true }
    );

    if (!existingUser) {
      throw new Error('User do not Found');
    }

    return existingUser.toObject();
  } catch (error) {
    throw new Error('Failed to Update User');
  }
};

// Service Function to delete a user by Id
const deleteUserFromDB = async (userId: number) => {
  const user = await User.findOneAndDelete({ userId });

  if (!user) {
    throw new Error('User not found');
  }
  return null;
};

const addProductToOrder = async (
  userId: number,
  orderData: { productName: string; price: number; quantity: number }
) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }
    // If 'orders' property already exists, append the new product; otherwise, create 'orders' array
    if (user.orders) {
      user.orders.push(orderData);
    } else {
      user.orders = [orderData];
    }
    await user.save();
    return null;
  } catch (error) {
    throw new Error('Failed to add product to order');
  }
};

const getAllOrdersForUser = async (userId: number) => {
  const user = await User.findOne(
    { userId },
    { _id: 0, password: 0, isActive: 0, hobbies: 0 }
  );
  if (!user) {
    throw new Error('User not found');
  }
  return user.orders || [];
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  deleteUserFromDB,
  updateUserInDB,
  addProductToOrder,
  getAllOrdersForUser,
};
