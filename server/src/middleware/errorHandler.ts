import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  const expose =
    process.env.NODE_ENV !== 'production' && typeof err.message === 'string';
  res.status(500).json({
    success: false,
    message: expose ? err.message : 'Server error',
  });
};