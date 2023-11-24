import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExist(user.userId)) {
    throw new Error(`User ${user.userId} already exists`);
  }
  const result = await User.create(user); // Built-in Static Method
  return result;
};

// Service function to get all users
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

// Service Function to get a User by Id
const getUserByIdFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

// Service Function to delete a user by Id
const deleteUserFromDB = async (userId: number) => {
  const user = await User.findOneAndDelete({ userId });

  if (!user) {
    throw new Error('User not found');
  }
  return null;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  deleteUserFromDB,
};
