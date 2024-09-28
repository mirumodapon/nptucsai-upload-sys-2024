import Sequelize from 'sequelize';
import sequelize, { User, UserInformation } from '@/database';
import HttpException from '@/exceptions/http';
import type { I_UserListFilterWithPagination, I_UserListFilter, I_UserCreate, I_UserDelete, I_UserUpdate } from '@/schemas/users';

class UserService {
  userList({ limit, page, ...filter }: I_UserListFilterWithPagination) {
    return User.findAll({
      where: filter,
      limit,
      offset: limit * page - limit
    });
  }

  userCount(where: I_UserListFilter) {
    return User.count({ where });
  }

  userCreate(user: I_UserCreate) {
    console.log(user);
    return User.create(user, { include: [UserInformation] });
  }

  userDelete(users: I_UserDelete) {
    return User.destroy({ where: { user_id: { [Sequelize.Op.in]: users } } });
  }

  async userUpdate(payload: I_UserUpdate) {
    const { user_id, user_information, ...user } = payload;
    const where = { user_id: { [Sequelize.Op.in]: user_id } };
    const transaction = await sequelize.transaction();
    const action = [];

    if (!Object.values(user).every(col => col === undefined)) {
      action.push(User.update(user, { where, transaction }));
    }

    if (!Object.values(user_information).every(col => col === undefined)) {
      action.push(UserInformation.update(user_information, { where, transaction }));
    }

    const effect = (await Promise.all(action)).flat();

    if (!effect.every(e => e === effect[0])) {
      await transaction.rollback();
      throw new HttpException({ message: 'Update user failed', status: 500 });
    }

    await transaction.commit();
    return effect[0];
  }
}

export default UserService;
