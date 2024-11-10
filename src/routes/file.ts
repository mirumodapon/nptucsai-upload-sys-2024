import { Router } from 'express';
import FileController from '@/controllers/file';
import uploadFileMiddleware from '@/middleware/uploadFile';
import { auth } from '@/middleware/auth';

class FileRoute {
  public path = '/api/files';
  public router = Router();
  public controller = new FileController();

  constructor() {
    this.initMiddleware();
    this.initRoutes();
  }

  initMiddleware() {
    this.router.use(auth);
    this.router.use(uploadFileMiddleware.single('file'));
  }

  initRoutes() {
    this.router.post('/:category', [], this.controller.uploadFile);
  }
}

export default new FileRoute();
