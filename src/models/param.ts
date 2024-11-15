import { Model, Sequelize, DataTypes } from 'sequelize';

type I_Param = {
};

class ParamModel extends Model implements I_Param {
}

export default function (sequelize: Sequelize): typeof ParamModel {
  return ParamModel.init({
    key: {
      primaryKey: true,
      type: DataTypes.STRING(20)
    },
    value: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize
  });
}
