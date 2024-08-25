import { Router } from 'express';
import ActivityRecordController from '@/controllers/activity_record';

class ActivityRecordRoute {
  public router = Router();
  public path = '/api/activity-record';
  public controller = new ActivityRecordController();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/', this.controller.activityRecordCreate);
    this.router.delete('/', this.controller.activityRecordDelete);
    // TODO: User checkin
    // TODO: User Ceckout
  }
}

export default new ActivityRecordRoute();
