import { Sequelize } from 'sequelize';
import { NODE_ENV, MYSQL_URL, APP_TIMEZONE } from '@/config';
import logger from '@/utils/logger';

const sequelize = new Sequelize(MYSQL_URL, {
  dialect: 'mysql',
  timezone: APP_TIMEZONE,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true
  },
  pool: { min: 0, max: 10 },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true
});

export default sequelize;

import GroupModel from '@/models/group';
import UserModel from '@/models/user';
import FileModel from '@/models/file';

export const Group = GroupModel(sequelize);
export const User = UserModel(sequelize);
export const File = FileModel(sequelize);

User.hasOne(Group, { foreignKey: 'group_id', sourceKey: 'group_id' });
Group.hasMany(User, { foreignKey: 'group_id' });
Group.hasMany(File, { foreignKey: 'group_id' });
File.hasOne(User, { foreignKey: 'create_by' });
