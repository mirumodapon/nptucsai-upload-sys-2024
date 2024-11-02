import { Handler } from 'express';
import UserService from '@/services/user';

class UserController {
  private userService = new UserService();

  /** List all user */
  listUser: Handler = async (_, res, next) => {
    try {
      const result = await this.userService.listUser();

      res.send(result);
    }
    catch (error) {
      next({ error });
    }
  };
}

export default UserController;
