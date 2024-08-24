import App from '@/app';
import { APP_PORT } from '@/config';

import mysql from '@/database';
import redis from '@/database/redis';

import auth from '@/routes/auth';
import user from '@/routes/users';
import activity from '@/routes/activity';

async function main() {
  await mysql.authenticate();
  await redis.connect();

  const app = new App({ routes: [auth, user, activity] });
  app.listen(APP_PORT);
}

main();
