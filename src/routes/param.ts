import { Router } from 'express';
import ParamController from '@/controllers/param';
import { adminonly, auth } from '@/middleware/auth';

class ParamRoute {
  public path = '/api/param';
  public router = Router();
  private controller = new ParamController();

  constructor() {
    this.initMiddleware();
    this.initRoutes();
  }

  initMiddleware() {
  }

  initRoutes() {
    this.router.get('/:key', [auth], this.controller.getParam);
    this.router.get('/', [auth], this.controller.getParams);
    this.router.put('/', [adminonly], this.controller.setParams);
  }
}

export default new ParamRoute();
