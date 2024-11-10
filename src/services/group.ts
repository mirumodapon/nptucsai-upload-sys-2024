import sequelize, { User, Group, File } from '@/database';
import { CreateGroupType } from '@/schemas/group';

type I_ListGroupFileNewer = {
  file_id: string; group_id: number; type: string; filename: string;
}[][];

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

  async listGroup() {
    const groupsPromise = Group.findAll();
    const filesPromise = sequelize.query(`
      SELECT file_id, group_id, type, filename
      FROM FileModel
      WHERE (group_id, type, created_at) in (
          SELECT group_id, type, MAX(created_at)
          FROM FileModel
          GROUP BY group_id, type
      )
    `)
      .then(result => result as I_ListGroupFileNewer)
      .then(([result]) =>
        result.reduce((previous, current) => {
          const { filename, file_id, type } = current;

          if (current.group_id in previous) {
            previous[current.group_id][type] = { file_id, filename };
          }
          else {
            previous[current.group_id] = { [type]: { file_id, filename } };
          }

          return previous;
        }, {})
      );

    const [groups, result] = await Promise.all([groupsPromise, filesPromise]);
    return groups.map(g => ({ ...g.dataValues, files: result[g.group_id] ?? [] }));
  }

  getGroup(id: string) {
    return Group.findByPk(id, {
      include: [
        {
          model: File,
          order: ['created_at']
        },
        {
          model: User,
          order: ['user_id']
        }
      ]
    });
  }
}

export default GroupService;
