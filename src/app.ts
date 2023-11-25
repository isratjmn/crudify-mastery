import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Crudify Mastery Server is saying Hello!!!',
  });
};

app.get('/', getAController);
console.log(process.cwd());
export default app;
