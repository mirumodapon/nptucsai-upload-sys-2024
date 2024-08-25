import App from '@/app';
import { APP_PORT } from '@/config';

import mysql from '@/database';
import redis from '@/database/redis';

import auth from '@/routes/auth';
import user from '@/routes/users';
import activity from '@/routes/activity';
import activityRecord from '@/routes/activity_record';

async function main() {
  await mysql.authenticate();
  await redis.connect();

  const app = new App({ routes: [auth, user, activity, activityRecord] });
  app.listen(APP_PORT);
}

main();
