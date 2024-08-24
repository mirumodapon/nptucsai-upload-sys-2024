import Sequelize from 'sequelize';
import sequelize, { User, UserEducation, UserInformation } from '@/database';
import type { I_UserListFilterWithPagination, I_UserListFilter, I_UserCreate, I_UserDelete, I_UserUpdate } from '@/schemas/users';

class UserService {
  userList(filter: I_UserListFilterWithPagination) {
    const { limit, page, ...where } = filter;
    return User.findAll({ where, limit, offset: limit * page - limit });
  }

  userCount(where: I_UserListFilter) {
    return User.count({ where });
  }

  userCreate(user: I_UserCreate) {
    return User.create(user, { include: [UserEducation, UserInformation] });
  }

  userDelete(users: I_UserDelete) {
    return User.destroy({ where: { user_id: { [Sequelize.Op.in]: users } } });
  }

  async userUpdate(payload: I_UserUpdate) {
    const { user_id, user_information, user_education, ...user } = payload;
    const where = { user_id: { [Sequelize.Op.in]: user_id } };
    const transaction = await sequelize.transaction();
    const action = [];

    if (!Object.values(user).every(col => col === undefined)) {
      action.push(User.update(user, { where, transaction }));
    }

    if (!Object.values(user_information).every(col => col === undefined)) {
      action.push(UserInformation.update(user_information, { where, transaction }));
    }

    if (!Object.values(user_education).every(col => col === undefined)) {
      action.push(UserEducation.update(user_education, { where, transaction }));
    }

    const effect = (await Promise.all(action)).flat();

    if (!effect.every(e => e === effect[0])) {
      await transaction.rollback();
      throw new Error('Update failed');
    }

    await transaction.commit();
    return effect[0];
  }
}

export default UserService;
