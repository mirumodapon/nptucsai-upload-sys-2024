import multer from 'multer';
import { join } from 'node:path';
import HttpException from '@/exceptions/http';
import logger from '@/utils/logger';

export default function (req, res, next) {
  try {
    multer({
      dest: join(process.cwd(), 'temp')
    }).single('file')(req, res, (error) => {
      if (!error) return next();

      if (error instanceof multer.MulterError) {
        return next({ error });
      }

      logger.error(error?.message);
      next({ error: new HttpException({ status: 400, message: '上傳失敗' }) });
    });
  }
  catch (error) {
    next({ error });
  }
}
