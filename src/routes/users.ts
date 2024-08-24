import { Router } from 'express';
import UserController from '@/controllers/users';

class UserRoute {
  public router = Router();
  public path = '/api/users';
  private controller = new UserController();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/', this.controller.userList);
    this.router.post('/', this.controller.userCreate);
    this.router.delete('/', this.controller.userDelete);
    this.router.patch('/', this.controller.userUpdate);
  }
}

export default new UserRoute();
