import { Handler } from 'express';

const auth: Handler = (req, res, next) => {
  next();
};

export default auth;
