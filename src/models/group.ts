import { Model, Sequelize, DataTypes } from 'sequelize';

type I_Group = {
};

class GroupModel extends Model implements I_Group {
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
