import { Router } from 'express';
import GroupController from '@/controllers/group';
import { adminonly } from '@/middleware/auth';

class GroupRoute {
  public path = '/api/groups';
  public router = Router();
  private controller = new GroupController();

  constructor() {
    this.initMiddleware();
    this.initRoute();
  }

  private initMiddleware() {
    this.router.use(adminonly);
  }

  private initRoute() {
    this.router.post('/', [], this.controller.createGroup);
    this.router.get('/', [], this.controller.listGroup);
    this.router.get('/files', [], this.controller.downloadFiles);
    this.router.delete('/:id', [], this.controller.deleteGroup);
  }
};

export default new GroupRoute();
