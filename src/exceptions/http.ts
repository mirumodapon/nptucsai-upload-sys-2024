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

  determine(error: Error) {
    if (error instanceof HttpException) {
      return { ...error };
    }

    else if (error instanceof ZodError) {
      return { status: 400, message: 'Data validation failed.' };
    }

    else if (error.name.startsWith('Sequelize')) {
      return this.deterSequelizeError(error);
    }

    else return { status: 500, message: 'Internal Server Error.' };
  }

  deterSequelizeError(error: any) { // HACK: There is an any type.
    switch (error?.parent.code) {
      case 'ER_DUP_ENTRY': return { status: 406, message: 'The resource already exists.' };
      case 'ER_NO_REFERENCED_ROW_2': return { status: 406, message: 'Not found resource reference.' };
      default: return { status: 500, message: 'Internal Server Error.' };
    }
  }
}
//
// else if (error.name === 'SequelizeUniqueConstraintError') {
//   return { status: 406, message: 'The resource is existed.' };
//
// }
export default HttpException;
