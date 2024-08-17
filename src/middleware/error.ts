import { Request, Response, NextFunction } from 'express';
import HttpException from '@/exceptions/http';

export default function HttpErrorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  if (!error) return next();

  return res.status(error.status).send({ message: error.message });
}
