import Sequelize from 'sequelize';
import { Activity } from '@/database';
import type { I_ActivityCreate, I_ActivityListWithPagination, I_ActivityList, I_ActivityDelete, I_ActivityUpdate } from '@/schemas/activity';

class ActivityService {
  activityList(filter: I_ActivityListWithPagination) {
    const { start, end, page, limit } = filter;
    const datetime = {};

    if (start) datetime[Sequelize.Op.gt] = filter.start;
    if (end) datetime[Sequelize.Op.lt] = filter.end;

    return Activity.findAll({
      where: { datetime: { [Sequelize.Op.or]: datetime } },
      offset: page * limit - limit,
      limit
    });
  }

  activityCount(filter: I_ActivityList) {
    const { start, end } = filter;
    const datetime = {};

    if (start) datetime[Sequelize.Op.gt] = filter.start;
    if (end) datetime[Sequelize.Op.lt] = filter.end;

    return Activity.count({ where: { datetime: { [Sequelize.Op.or]: datetime } } });
  }

  activityCreate(activity: I_ActivityCreate) {
    return Activity.create(activity);
  }

  activityDelete(activity: I_ActivityDelete) {
    return Activity.destroy({ where: { activity_id: { [Sequelize.Op.in]: activity } } });
  }

  activityUpdate(activity: I_ActivityUpdate) {
    const { activity_id, ...payload } = activity;
    return Activity.update(payload, { where: { activity_id: { [Sequelize.Op.in]: activity_id } } });
  }
}

export default ActivityService;
