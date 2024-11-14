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
  }

  initRoutes() {
    this.router.post('/:category', [
      auth, uploadFileMiddleware
    ], this.controller.uploadFile);

    this.router.get('/:type', [auth], this.controller.listFiles);
  }
}

export default new FileRoute();
