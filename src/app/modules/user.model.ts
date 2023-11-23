import { Schema, model, connect } from 'mongoose';
import { Address, FullName, User, UserOrder } from './user/user.interface';

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
    },
    fullName: fullNameSchema,
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        default: [],
    },
    address: addressSchema,
    orders: {
        type: [orderSchema],
        default: [],
    },
});


const User = model<User>('User', userSchema);
