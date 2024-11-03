import sequelize, { User, Group } from '@/database';
import { CreateGroupType } from '@/schemas/group';

class GroupService {
  async createGroup(payload: CreateGroupType) {
    const transaction = await sequelize.transaction();

    try {
      const group = await Group.create({ name: payload.name }, { transaction });
      const users = await User.bulkCreate(
        payload.users.map(u => Object.assign(u, { group_id: group.group_id })),
        {
          transaction,
          updateOnDuplicate: ['username', 'group_id']
        }
      );

      await transaction.commit();
      return { group, users };
    }
    catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  listGroup() {
    return Group.findAll();
  }
}

export default GroupService;
