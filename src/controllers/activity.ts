import { Handler } from 'express';
import ActivityService from '@/services/activity';
import { S_ActivityListWithPagination, S_ActivityCreate, S_ActivityList, S_ActivityDelete, S_ActivityUpdate } from '@/schemas/activity';

class ActivityController {
  activityService = new ActivityService();

  activityList: Handler = async (req, res, next) => {
    const query = req.query;
    try {
      const filter = S_ActivityListWithPagination.parse(query);
      const where = S_ActivityList.parse(query);

      const [activity, count] = await Promise.all([
        this.activityService.activityList(filter),
        this.activityService.activityCount(where)
      ]);

      res.send({ activity, count });
    }

    catch (error) {
      next({ error });
    }
  };

  activityCreate: Handler = async (req, res, next) => {
    const body = req.body;
    try {
      const payload = S_ActivityCreate.parse(body);
      const activity = await this.activityService.activityCreate(payload);
      return res.send(activity);
    }
    catch (error) {
      next({ error });
    }
  };

  activityDelete: Handler = async (req, res, next) => {
    const body = req.body;
    try {
      const payload = S_ActivityDelete.parse(body);
      const effect = await this.activityService.activityDelete(payload);

      res.send({ message: `Delete ${effect} activit${effect > 1 ? 'ies' : 'y'} successfully.` });
    }
    catch (error) {
      next({ error });
    }
  };

  activityUpdate: Handler = async (req, res, next) => {
    const body = req.body;
    try {
      const payload = S_ActivityUpdate.parse(body);
      const [effect] = await this.activityService.activityUpdate(payload);

      res.send({ message: `Update ${effect} activit${effect > 1 ? 'ies' : 'y'} successfully.` });
    }
    catch (error) {
      next({ error });
    }
  };
}

export default ActivityController;
