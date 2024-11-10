import { Handler } from 'express';
import GroupService from '@/services/group';
import { CreateGroupSchema } from '@/schemas/group';

class GroupController {
  private groupService = new GroupService();

  /**
  * Create group api
  * The request body must has user list and group name
  */
  createGroup: Handler = async (req, res, next) => {
    try {
      const parse = CreateGroupSchema.parse(req.body);
      const result = await this.groupService.createGroup(parse);
      res.send(result);
    }
    catch (error) {
      next({ error });
    }
  };

  /**
   * List group api
   * This api just list group and no more details
   * if you want more details you can use /api/groups/:id
   */
  listGroup: Handler = async (_, res, next) => {
    try {
      const result = await this.groupService.listGroup();
      res.send(result);
    }
    catch (error) {
      next({ error });
    }
  };

  /**
   * Get special group information
   */
  getGroup: Handler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await this.groupService.getGroup(id);

      if (!result) return res.status(404).send('Not Found.');
      res.send(result);
    }
    catch (error) {
      next(error);
    }
  };
}

export default GroupController;
