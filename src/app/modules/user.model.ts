import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TUser,
  TUserOrder,
  userModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

// MongoDB Schema for FullName
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// MongoDB Schema for Address
const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

// MongoDB Schema for Order

const orderSchema = new Schema<TUserOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// MongoDB Schema for User

const userSchema = new Schema<TUser, userModel>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  orders: {
    type: [orderSchema],
  },
});

// Pre Save  Hook for the User Schema
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // Making password hash
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// Post Save  Hook for the User Schema
userSchema.post('save', function () {
  console.log(this, 'post hook: we saved our data');
});

// Custom static method for the user schema
userSchema.statics.isUserExist = async function (
  userId: number
): Promise<TUser | null> {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, userModel>('User', userSchema);
