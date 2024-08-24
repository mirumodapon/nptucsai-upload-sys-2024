import { randomUUID } from 'crypto';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { I_Activity, ActivityId } from '@/types/activity';

export class ActivityModel extends Model implements I_Activity {
  public activity_id: ActivityId;
  public name: string;
  public host: string;
  public location: string;
  public datetime: Date;

  public createdAt: Date;
  public updatedAt: Date;
}

export default function Activity(sequelize: Sequelize): typeof ActivityModel {
  ActivityModel.init({
    activity_id: {
      primaryKey: true,
      type: DataTypes.UUID(),
      defaultValue: randomUUID
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    host: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    datetime: {
      type: DataTypes.DATE(),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'activity'
  });

  return ActivityModel;
}
