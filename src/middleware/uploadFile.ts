import multer from 'multer';
import { join } from 'node:path';
import HttpException from '@/exceptions/http';
import logger from '@/utils/logger';
import { client } from '@/database/redis';

async function getExpTime(category) {
  const key = ({ book: 'BOOK_EXP', poster: 'POSTER_EXP', ppt: 'DEMO_EXP' })[category];
  const value = await client.get(key);

  return parseInt(value);
}
export default async function (req, res, next) {
  try {
    const category = req.params.category;

    const value = await getExpTime(category);
    if (!value)
      return next({ error: new HttpException({ status: 400, message: '上傳失敗' }) });

    if (Date.now() > value)
      return next({ error: new HttpException({ status: 400, message: '已過了上傳時間' }) });

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
