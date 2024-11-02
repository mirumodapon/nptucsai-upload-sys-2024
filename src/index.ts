import App from '@/app';
import { APP_PORT } from '@/config';

import mysql from '@/database';
import redis from '@/database/redis';

import authRoute from '@/routes/auth';
import groupRoute from '@/routes/group';
import userRoute from '@/routes/user';

async function main() {
  await mysql.authenticate();
  await redis.connect();

  const app = new App({ routes: [authRoute, groupRoute, userRoute] });
  app.listen(APP_PORT);
}

main();
