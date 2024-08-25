import Sequelize from 'sequelize';
import { ActivityRecord } from '@/database';
import { I_ActivityRecordCreate, I_ActivityRecordDelete } from '@/schemas/activity_record';

class ActivityRecordService {
  activityCreate(payload: I_ActivityRecordCreate) {
    const activity_id = payload.activity;
    const records = payload.user.map(user_id => ({ activity_id, user_id }));

    return ActivityRecord.bulkCreate(records);
  }

  activityDelete(payload: I_ActivityRecordDelete) {
    const { activity, user } = payload;
    return ActivityRecord.destroy({
      where: { activity_id: activity, user_id: { [Sequelize.Op.in]: user } }
    });
  }
}

export default ActivityRecordService;
