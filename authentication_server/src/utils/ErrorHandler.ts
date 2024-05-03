
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../models/ApiResponse';
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); 

  const response = new ApiResponse('Internal Server Error', 'error');
  res.status(500).json(response);
  return;

};
