import multer from 'multer';
import { join } from 'node:path';

export default multer({
  dest: join(process.cwd(), 'temp')
});
