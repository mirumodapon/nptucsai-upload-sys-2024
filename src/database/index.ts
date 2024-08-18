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

import UserModel from '@/models/user';
import UserEducationModel from '@/models/user_education';
import UserInformationModel from '@/models/user_information';

export const User = UserModel(sequelize);
export const UserEducation = UserEducationModel(sequelize);
export const UserInformation = UserInformationModel(sequelize);

User.hasOne(UserEducation, { foreignKey: 'user_id', onDelete: 'CASCADE', constraints: true });
User.hasOne(UserInformation, { foreignKey: 'user_id', onDelete: 'CASCADE', constraints: true });
