import { Sequelize, Model, DataTypes } from 'sequelize';
import type { UserId } from '@/types/user';
import type { I_UserInformation } from '@/types/user_information';

export class UserInformationModel extends Model implements I_UserInformation {
  public user_id: UserId;
  public id: string;
  public birthday: string;
  public phone: string;
  public address: string;

  public updatedAt: Date;
}

export default function UserInformation(sequelize: Sequelize): typeof UserInformationModel {
  UserInformationModel.init(
    {
      user_id: {
        primaryKey: true,
        type: DataTypes.STRING(10)
      },
      id: DataTypes.STRING(10),
      birthday: DataTypes.DATEONLY,
      phone: DataTypes.STRING(10),
      address: DataTypes.STRING(120)
    },
    {
      modelName: 'user_information',
      createdAt: false,
      sequelize

    }
  );

  return UserInformationModel;
}
