import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// Service function to get all users
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

// Service Function to get a User by Id
const getUserByIdFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

// Service Function to delete a user by Id
const deleteUserFromDB = async (userId: number) => {
  const user = await UserModel.findOneAndDelete({ userId });

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
