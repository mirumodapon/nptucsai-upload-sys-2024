import { User } from '@/database';

class UserService {
  async listUser() {
    return User.findAll();
  }
}

export default UserService;
