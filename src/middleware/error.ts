import { Request, Response, NextFunction } from 'express';
import HttpException from '@/exceptions/http';
import type { HttpExceptionOptions } from '@/types/http';

export default function HttpErrorMiddleware(errorOptions: HttpExceptionOptions, req: Request, res: Response, next: NextFunction) {
  const error = new HttpException(errorOptions);

  if (!error) return next();
  return res.status(error.status).send({ message: error.message });
}
