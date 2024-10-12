import { Router } from 'express';
import AuthController from '@/controllers/auth';

class AuthRoute {
  public router = Router();
  public path = '/api/auth';
  private controller = new AuthController();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/', this.controller.authList);
    this.router.get('/google/callback', this.controller.googleAuth);
    this.router.get('/google', this.controller.googleAuth);
    this.router.get('/logout', this.controller.logout);
    this.router.get('/whoami', this.controller.whoami);
  }
}

export default new AuthRoute();
