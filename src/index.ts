import App from '@/app';
import { APP_PORT } from '@/config';

import mysql from '@/database';
import redis from '@/database/redis';

import auth from '@/routes/auth';
import user from '@/routes/users';

async function main() {
  await mysql.authenticate();
  await redis.connect();

  const app = new App({ routes: [auth, user] });
  app.listen(APP_PORT);
}

main();
