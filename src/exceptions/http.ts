import logger from '@/utils/logger';
import type { HttpExceptionOptions } from '@/types/http';

class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(options: HttpExceptionOptions) {
    const { error, status, message } = options;

    if (error) {
      logger.error(error);
      const { status, message } = determine(error);
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
    return { status: 500, message: 'Internal Server Error.' };
  }
}

export default HTTPException;
