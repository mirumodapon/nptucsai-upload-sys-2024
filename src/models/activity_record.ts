import { Sequelize, Model, DataTypes } from 'sequelize';
import { I_ActivityRecord, ActivityId } from '@/types/activity';
import { UserId } from '@/types/user';

export class ActivityRecordModel extends Model implements I_ActivityRecord {
  public activity_id: ActivityId;
  public user_id: UserId;
  public sign_in: Date;
  public sign_out: Date;
  public enable: boolean;
}

export default function ActivityRecord(sequelize: Sequelize): typeof ActivityRecordModel {
  ActivityRecordModel.init({
    activity_id: {
      primaryKey: true,
      type: DataTypes.UUID()
    },
    user_id: {
      primaryKey: true,
      type: DataTypes.STRING(10)
    },
    sign_in: {
      type: DataTypes.DATE(),
      allowNull: true
    },
    sign_out: {
      type: DataTypes.DATE(),
      allowNull: true
    },
    enable: {
      type: DataTypes.BOOLEAN(),
      defaultValue: () => true // TODO: Setup by user
    }
  }, {
    sequelize,
    modelName: 'activity_record',
    timestamps: false
  });

  return ActivityRecordModel;
}
