import { Handler } from 'express';
import UserService from '@/services/users';
import { S_UserListFilterWithPagination, S_UserListFilter, S_UserCreate, S_UserDelete, S_UserUpdate } from '@/schemas/users';

class UserController {
  userService = new UserService();

  /**
   * List users with query filter
   */
  userList: Handler = async (req, res, next) => {
    const query = req.query;
    try {
      const filter = S_UserListFilterWithPagination.parse(query);
      const where = S_UserListFilter.parse(query);

      const [users, total] = await Promise.all([
        this.userService.userList(filter),
        this.userService.userCount(where)
      ]);

      return res.send({
        total,
        page: filter.page,
        limit: filter.limit,
        users
      });
    }
    catch (error) {
      next({ error });
    }
  };

  /**
   * Create a user
   */
  userCreate: Handler = async (req, res, next) => {
    const body = req.body;
    try {
      const payload = S_UserCreate.parse(body);
      const user = await this.userService.userCreate(payload);
      return res.send(user);
    }
    catch (error) {
      next({ error });
    }
  };

  /**
   * Delete users (multi)
   */
  userDelete: Handler = async (req, res, next) => {
    const body = req.body;
    try {
      const payload = S_UserDelete.parse(body);
      const effect = await this.userService.userDelete(payload);

      res.send({ message: `Delete ${effect} user(s) successfully.` });
    }
    catch (error) {
      next({ error });
    }
  };

  /**
   * Update user
   */
  userUpdate: Handler = async (req, res, next) => {
    const body = req.body;
    try {
      const user = S_UserUpdate.parse(body);
      const effect = await this.userService.userUpdate(user);

      if (!effect) throw new Error('Update user failed.');
      else res.send({ message: `Update ${effect} user(s) successfully.` });
    }
    catch (error) {
      next({ error });
    }
  };

  /**
   * TODO: Create users with files
   */

  /**
   * TODO: Get full information of user
   */
}

export default UserController;
