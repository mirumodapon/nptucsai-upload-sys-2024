import logger from '@/utils/logger';
import { ZodError } from 'zod';
import type { HttpExceptionOptions } from '@/types/http';

class HttpException {
  public status: number;
  public message: string;

  constructor(options: HttpExceptionOptions) {
    const { error } = options;

    if (error) {
      logger.error(error);
      const { status, message } = this.determine(error);
      this.status = status;
      this.message = message;

      return;
    }

    const { status, message } = options;

    if (status) {
      this.status = status;
    }

    if (message) {
      this.message = message;
    }
  }

  determine(error: any) {
    if (error instanceof ZodError) {
      return { status: 400, message: 'Data validation failed.' };
    }

    else if (error.name === 'SequelizeUniqueConstraintError') {
      return { status: 406, message: 'The resource is existed.' };
    }

    else return { status: 500, message: 'Internal Server Error.' };
  }
}

export default HttpException;
