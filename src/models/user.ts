import { Sequelize, Model, DataTypes } from 'sequelize';
import type { I_User, UserId, UserRole } from '@/types/user';

export class UserModel extends Model implements I_User {
  public user_id: UserId;
  public username: string;
  public email: string;
  public permission: number;
  public role: UserRole;

  public createdAt: Date;
  public updatedAt: Date;
}

export default function User(sequelize: Sequelize): typeof UserModel {
  UserModel.init({
    user_id: {
      primaryKey: true,
      type: DataTypes.STRING(10)
    },
    username: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50)
    },
    permission: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    role: {
      type: DataTypes.ENUM,
      values: ['STAFF', 'STUDENT', 'TEACHER'],
      defaultValue: 'STUDENT'
    }
  },
  {
    modelName: 'user',
    sequelize
  });

  return UserModel;
}
