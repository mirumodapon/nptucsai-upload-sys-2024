import { Router } from 'express';
import GroupController from '@/controllers/group';
import auth from '@/middleware/auth';

class GroupRoute {
  public path = '/api/groups';
  public router = Router();
  private controller = new GroupController();

  constructor() {
    this.initMiddleware();
    this.initRoute();
  }

  private initMiddleware() {
    this.router.use(auth);
  }

  private initRoute() {
    this.router.post('/', [], this.controller.createGroup);
    this.router.get('/', [], this.controller.listGroup);
  }
};

export default new GroupRoute();
