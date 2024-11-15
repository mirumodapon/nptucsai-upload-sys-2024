import Sequelize from 'sequelize';
import { Param } from '@/database';
import { client } from '@/database/redis';

class ParamService {
  getParam(key: string) {
    return Param.findByPk(key);
  }

  getParams(keys: string[]) {
    return Param.findAll(
      { where: { key: { [Sequelize.Op.in]: keys } } }
    );
  }

  setParam(key: string, value: string) {
    client.set(key, value);
    return Param.update({ value }, { where: { key } });
  }
}

export default ParamService;
