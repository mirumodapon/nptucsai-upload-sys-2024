import { Model, Sequelize, DataTypes } from 'sequelize';

type I_User = {
  user_id: string;
  group_id: number;
  username: string;
};

class UserModel extends Model implements I_User {
  public user_id: string;
  public group_id: number;
  public username: string;
}

export default function (sequelize: Sequelize): typeof UserModel {
  return UserModel.init(
    {
      user_id: {
        primaryKey: true,
        type: DataTypes.STRING(10)
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(10)
      }

    },
    {
      sequelize,
      indexes: [{
        name: 'user_group',
        fields: ['group_id']
      }]
    }
  );
}
