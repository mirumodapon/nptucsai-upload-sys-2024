// @ts-nocheck

export const auth: Handler = (req, res, next) => {
  const group_id = req.session.passport?.user.GroupModel.group_id;
  const user_id = req.session.passport?.user.user_id;
  if (group_id === undefined) return res.status(401).send('Unauthorization');

  req.group_id = group_id;
  req.user_id = user_id;
  next();
};

export const adminonly: Handler = (req, res, next) => {
  const group_id = req.session.passport?.user.GroupModel.group_id;
  const user_id = req.session.passport?.user.user_id;
  if (!group_id) return res.status(401).send('Unauthorization');
  if (group_id !== 1) return res.status(401).send('Unauthorization');

  req.group_id = group_id;
  req.user_id = user_id;
  next();
};
