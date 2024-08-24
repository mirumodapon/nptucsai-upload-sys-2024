import { Router } from 'express';
import ActivityController from '@/controllers/activity';

class ActivityRoute {
  public router = Router();
  public path = '/api/activity';
  private controller = new ActivityController();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/', this.controller.activityList);
    this.router.post('/', this.controller.activityCreate);
    this.router.patch('/', this.controller.activityUpdate);
    this.router.delete('/', this.controller.activityDelete);
    // TODO: Add record for user
    // TODO: User checkin
    // TODO: User Ceckout
  }
}

export default new ActivityRoute();
