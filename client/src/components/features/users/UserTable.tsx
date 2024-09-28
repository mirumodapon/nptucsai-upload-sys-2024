import type { I_User } from '@/types/user';
import { getUserColumn } from '@/utils/user';

function UserTable(props: Props) {
  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th className="w-14">
            <input type="checkbox" className="checkbox checkbox-primary" />
          </th>
          <th>學號</th>
          <th>姓名</th>
          <th>類別</th>
          <th>學制</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (
          <tr key={user.user_id}>
            <td className="w-14">
              <input type="checkbox" className="checkbox checkbox-primary" />
            </td>
            <td>
              {user.user_id}
            </td>

            {
              ['username', 'role', 'type'].map(col => (
                <td key={col}>
                  {getUserColumn(user, col)}
                </td>
              ))
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;

type Props = {
  users: I_User[];
};
