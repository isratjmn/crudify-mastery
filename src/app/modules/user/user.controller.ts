import { Request, Response } from 'express';

const createUser = (req: Request, res: Response) => {
  const user = req.body;

  // Will call service function to send this data
};
