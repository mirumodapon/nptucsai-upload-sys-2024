import { Handler } from 'express';
import ActivityRecordService from '@/services/activity_record';
import { S_ActivityRecordCreate, S_ActivityRecordDelete } from '@/schemas/activity_record';

class ActvitiyRecordController {
  activityRecordService = new ActivityRecordService();

  activityRecordCreate: Handler = async (req, res, next) => {
    const body = req.body;

    try {
      const payload = S_ActivityRecordCreate.parse(body);
      const records = await this.activityRecordService.activityCreate(payload);

      return res.send({ records });
    }
    catch (error) {
      next({ error });
    }
  };

  activityRecordDelete: Handler = async (req, res, next) => {
    const body = req.body;

    try {
      const payload = S_ActivityRecordDelete.parse(body);
      const effects = await this.activityRecordService.activityDelete(payload);

      res.send({ message: `Delete ${effects} record(s) successfully.` });
    }
    catch (error) {
      next({ error });
    }
  };
}

export default ActvitiyRecordController;
