import { Router } from 'express';
import UserController from '@/controllers/user';
import { adminonly } from '@/middleware/auth';

class UserRoute {
  public path = '/api/users';
  public router = Router();
  private controller = new UserController();

  constructor() {
    this.initMiddleware();
    this.initRoute();
  }

  private initMiddleware() {
    this.router.use(adminonly);
  }

  private initRoute() {
    this.router.get('/', [], this.controller.listUser);
  }
};

export default new UserRoute();
