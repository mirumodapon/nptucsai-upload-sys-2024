import { Sequelize, Model, DataTypes } from 'sequelize';
import type { UserId } from '@/types/user';
import type { I_UserEducation, EducationType } from '@/types/user_education';

export class UserEducationModel extends Model implements I_UserEducation {
  public user_id: UserId;
  public graduate: boolean;
  public type: EducationType;
  public grade: number;

  public updatedAt: Date;
}

export default function UserEducation(sequelize: Sequelize): typeof UserEducationModel {
  UserEducationModel.init(
    {
      user_id: {
        primaryKey: true,
        type: DataTypes.STRING(10)
      },
      graduate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      type: {
        type: DataTypes.ENUM,
        values: ['CBE', 'BBE', 'PBE']
      },
      grade: { type: DataTypes.TINYINT }
    },
    {
      modelName: 'user_education',
      createdAt: false,
      sequelize
    }
  );

  return UserEducationModel;
}
