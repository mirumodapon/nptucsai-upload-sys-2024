import App from '@/app';
import { APP_PORT } from '@/config';

import mysql from '@/database';
import redis from '@/database/redis';

import auth from '@/routes/auth';

async function main() {
  await mysql.authenticate();
  await redis.connect();

  const app = new App({ routes: [auth] });
  app.listen(APP_PORT);
}

main();
