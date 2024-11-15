import { Router, static as static_files } from 'express';
import { join } from 'node:path';

class ClientRoute {
  public path = '/';
  public router = Router();

  constructor() {
    this.initMiddleware();
    this.initRoutes();
  }

  initMiddleware() {
  }

  initRoutes() {
    ['/admin*', '/dashboard*'].forEach((p) => {
      this.router.get(p,
        (req, res) => res.sendFile(join(process.cwd(), 'client', 'dist', 'index.html')));
    });
    this.router.use('/', static_files(
      join(process.cwd(), 'client', 'dist')
    ));
  }
}

export default new ClientRoute();
