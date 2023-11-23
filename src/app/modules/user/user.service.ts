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
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
};
