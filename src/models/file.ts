import { Model, Sequelize, DataTypes } from 'sequelize';
import { randomUUID } from 'crypto';

type I_File = {
  file_id: string;
  group_id: string;
  filename: string;
  type: string;
  create_by: string;
};

class FileModel extends Model implements I_File {
  public file_id: string;
  public group_id: string;
  public filename: string;
  public type: string;
  public create_by: string;

  public createdAt: Date;
  public updatedAt: Date;
}

export default function (sequelize: Sequelize): typeof FileModel {
  return FileModel.init(
    {
      file_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: randomUUID
      },
      group_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      filename: {
        type: DataTypes.TEXT
      },
      type: {
        type: DataTypes.STRING(20)
      },
      create_by: {
        allowNull: false,
        type: DataTypes.STRING(10)
      }
    },
    {
      sequelize,
      indexes: [{
        name: 'file_group',
        fields: ['group_id']
      }]
    }
  );
}
