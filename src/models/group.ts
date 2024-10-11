import { Model, Sequelize, DataTypes } from 'sequelize';

type I_Group = {
  group_id: number;
  name: string;
};

class GroupModel extends Model implements I_Group {
  public group_id: number;
  public name: string;
}

export default function (sequelize: Sequelize): typeof GroupModel {
  return GroupModel.init({
    group_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize
  });
}
