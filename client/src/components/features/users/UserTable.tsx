import type { I_User } from '@/types/user';
import useUserColumn from '@/store/useUserColumn';
import { getUserColumn } from '@/utils/user';
import { useNavigate } from 'react-router-dom';

function UserTable(props: Props) {
  const navigate = useNavigate();
  const cols = useUserColumn(state => state.getCol());

  return (
    <table className="table table-zebra border-collapse border-spacing-0 [&_td]:whitespace-nowrap">
      <thead>
        <tr className="[&>th]:bg-neutral-300 text-neutral-600 dark:[&>th]:bg-neutral-700 dark:text-neutral-300">
          <th className="w-14">
            <input type="checkbox" className="checkbox checkbox-primary" />
          </th>
          <th className="w-36">學號</th>
          { cols.map(col => <th key={col.value}>{col.name}</th>) }
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (
          <tr onDoubleClick={() => navigate(`/dashboard/users/${user.user_id}`)} key={user.user_id}>
            <td>
              <input type="checkbox" className="checkbox checkbox-primary" />
            </td>
            <td>
              {user.user_id}
            </td>

            {
              cols.map(col => (
                <td key={col.value}>
                  {getUserColumn(user, col.value)}
                </td>
              ))
            }
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="text-right" colSpan={10}>{`共計 ${props.total} 筆`}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default UserTable;

type Props = {
  total: number;
  users: I_User[];
};
