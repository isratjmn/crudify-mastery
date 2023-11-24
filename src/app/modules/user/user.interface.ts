/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUserOrder = {
    productName: string;
    price: number;
    quantity: number;
};

export type TAddress = {
    street: string;
    city: string;
    country: string;
};
export type TFullName = {
    firstName: string;
    lastName: string;
};

export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TAddress;
    orders?: TUserOrder[];
};

// For Creating Static method
export interface userModel extends Model<TUser> {
    isUserExist(userId: number): Promise<TUser | null>;
}
