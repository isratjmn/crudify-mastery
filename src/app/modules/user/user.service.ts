import { User } from '../user.model';
import { TUser } from './user.interface';

//* 1. Service to Create a new User
const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExist(user.userId)) {
    throw new Error(`User ${user.userId} already exists`);
  }
  const result = await User.create(user);
  return result;
};

//* 2. Service to Get All Users Data
const getAllUsersFromDB = async () => {
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

//* 3. Service to get a User by Id
const getUserByIdFromDB = async (userId: number) => {
  try {
    const user = await User.findOne({ userId }, { password: 0 });
    if (!user) {
      throw new Error('User not Found');
    }

    return user;
  } catch (error) {
    throw new Error('Failed to Fetch User');
  }
};

//* 4.Service for Update a User by Id
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

//* 5. Service to delete a user by Id
const deleteUserFromDB = async (userId: number) => {
  const user = await User.findOneAndDelete({ userId });

  if (!user) {
    throw new Error('User not found');
  }
  return null;
};

//? Order Management
//? 1. Service function to add an Order
const addProductToOrder = async (
  userId: number,
  orderData: { productName: string; price: number; quantity: number }
) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not Found');
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

//? 2. Service function to get Orders of a User
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

//? 3. Calculate the total price of the Orders
const calculateTotalPrice = async (userId: number) => {
  try {
    const user = await User.isUserExist(userId);
    if (!user) {
      throw new Error('User Not Found');
    }
    const totalPrice = user.orders?.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0
    );
    return totalPrice || 0;
  } catch (error) {
    throw new Error('Failed to Calculate Total Price');
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  deleteUserFromDB,
  updateUserInDB,
  addProductToOrder,
  getAllOrdersForUser,
  calculateTotalPrice,
};
