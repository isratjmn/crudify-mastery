import { z } from 'zod';
// import { TUser } from './user.interface';

// Validation Schema for FullName
const fullNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name cannot be empty' }),
  lastName: z.string().min(1, { message: 'Last name cannot be empty' }),
});

// Validation Schema for address
const addressValidationSchema = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

// Validation Schema for order
const orderValidationSchema = z.object({
  productName: z.string().min(1, { message: 'Product must be a string' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

// Validation Schema for User
export const userValidationSchema = z.object({
  userId: z.number().min(1, { message: 'User ID must be a positive number' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  fullName: fullNameValidationSchema,
  age: z
    .number()
    .int()
    .min(2, { message: 'Age must be a non-negative number' }),
  email: z.string().email({ message: 'Invalid email' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1, { message: 'Hobby is required' })),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

// Validation Function for Validating User Data
/* export function validateUser(data: unknown): TUser {
  try {
    return userValidation.parse(data) as TUser;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation Failed: ${error.message}`);
    }
    throw error;
  }
} */

export default userValidationSchema;
