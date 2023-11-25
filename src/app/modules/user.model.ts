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
    select: false,
  },
});

// Pre Save  Hook for the User Schema

userSchema.pre('save', async function (next) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (!user.password) {
      throw new Error('Password is Undefined');
    }
    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Post Find Hook for the User Schema
userSchema.post('find', function (docs: TUser[], next) {
  docs.forEach((doc) => {
    if (doc) {
      doc.password = undefined;
      doc.orders = undefined;
    }
  });
  next();
});

// Post Save Hook for the User Schema
userSchema.post('save', function (doc, next) {
  if (doc) {
    doc.password = undefined;
    doc.orders = undefined;
  }
  next();
});

// Custom static method for the User Schema
userSchema.statics.isUserExist = async function (
  userId: number
): Promise<TUser | null> {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, userModel>('User', userSchema);
