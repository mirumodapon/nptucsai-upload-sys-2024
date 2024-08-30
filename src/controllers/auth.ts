import { createHash, randomBytes } from 'node:crypto';
import { Handler } from 'express';
import { User } from '@/database';
import passport from 'passport';
import Google from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@/config';
import { generateQrcodeWithStream } from '@/utils/qrcode';
import redis from '@/database/redis';

class AuthController {
  constructor() {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
    passport.use(
      'google',
      new Google.Strategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: '/api/auth/google/callback',
          scope: ['profile', 'email']
        },
        async (access, refresh, profile, done) => {
          const [id, host] = profile._json.email.split('@');
          if (host !== 'nptu.edu.tw') return done('Invalid Credentials.', null);

          const user = await User.findByPk(id, { attributes: ['user_id', 'permission', 'role'] });
          if (!user) return done('Invalid Credentials.', null);

          done(null, user);
        }
      )
    );
  }

  authList: Handler = (req, res, next) => {
    return res.send([{ name: 'Google', url: '/api/auth/google' }]);
  };

  googleAuth: Handler = (req, res, next) => {
    if (req.user) return res.redirect('/dashboard');

    passport.authenticate('google', (err, user) => {
      if (err) return next({ status: 403, message: err });

      req.logIn(
        user,
        err => err ? next({ status: 403, message: err }) : res.redirect('/dashboard')
      );
    }).call(this, req, res, next);
  };

  logout: Handler = (req, res, next) => {
    req.logout(
      (err) => {
        if (err) return next({ error: err });

        req.session.destroy(() => 0);
        res.redirect('/');
      }
    );
  };

  whoami: Handler = (req, res, next) => {
    const user = req.user;

    if (!user) {
      req.session.destroy(() => 0);
      return next({ status: 401, message: 'You are not logged in.' });
    }

    res.send({ ...user });
  };

  authQr: Handler = async (req, res, next) => {
    // @ts-ignore-next-line WARN: Here is an ts ignore.
    const user_id = req?.user?.user_id;
    if (!user_id) return next({ status: 401, message: 'You are not logged in.' });

    const EX = 2 * 60; // 2 mins

    try {
      const secret = randomBytes(5).toString('hex');
      const token = createHash('sha256').update(secret + user_id).digest('hex');

      const stream = await generateQrcodeWithStream(token, { type: 'png', width: 300, errorCorrectionLevel: 'M' });
      redis.client.set(`QR:${token}`, user_id, { EX });

      res.set('Content-Type', 'image/png');
      stream.pipe(res);
    }
    catch (error) {
      next({ error });
    }
  };
}

export default AuthController;
