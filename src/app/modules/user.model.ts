import { Schema, model } from 'mongoose';
import { Address, FullName, User, UserOrder } from './user/user.interface';

// MongoDB Schema for FullName
const fullNameSchema = new Schema<FullName>({
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
const addressSchema = new Schema<Address>({
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

const orderSchema = new Schema<UserOrder>({
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

const userSchema = new Schema<User>({
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

export const UserModel = model<User>('User', userSchema);
