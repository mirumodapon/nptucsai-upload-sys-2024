import session from 'express-session';
import redisStore from 'connect-redis';
import { client } from '@/database/redis';
import { NODE_ENV, SESSION_SECRET, SESSION_MAX_AGE } from '@/config';

export default session({
  secret: SESSION_SECRET,
  resave: true,
  rolling: true,
  saveUninitialized: false,
  store: new redisStore({ client, prefix: 'UPLOAD:SESSION:' }),
  cookie: {
    maxAge: parseInt(SESSION_MAX_AGE) ?? 24 * 60 * 60 * 1000,
    httpOnly: true
  }
});
