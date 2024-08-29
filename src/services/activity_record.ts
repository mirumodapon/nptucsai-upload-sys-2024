import Sequelize from 'sequelize';
import { ActivityRecord } from '@/database';
import { I_ActivityRecordCreate, I_ActivityRecordDelete } from '@/schemas/activity_record';
import { UserId } from '@/types/user';
import { ActivityId } from '@/types/activity';

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

  async activityAutoCheck(activity_id: ActivityId, user_id: UserId) {
    const record = await ActivityRecord.findOne({ where: { activity_id, user_id } });

    if (!record) {
      return await ActivityRecord.create({ activity_id, user_id, sign_in: new Date() });
    }

    record.sign_out ??= new Date();
    await record.save();

    return record;
  }
}

export default ActivityRecordService;
