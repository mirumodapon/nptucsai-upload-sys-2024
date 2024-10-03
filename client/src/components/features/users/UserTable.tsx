import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserColumn from '@/store/useUserColumn';
import useUserSelect from '@/store/useUserSelect';
import { getUserColumn } from '@/utils/user';
import type { I_User } from '@/types/user';

function UserTable(props: Props) {
  const userCheckbox = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const userSelect = useUserSelect();
  const cols = useUserColumn(state => state.getCol());

  useEffect(() => {
    if (!userCheckbox.current) return;

    if (userSelect.users.length === 0) {
      userCheckbox.current.checked = false;
      userCheckbox.current.indeterminate = false;
    }

    else if (props.users.every(u => userSelect.users.includes(u.user_id))) {
      userCheckbox.current.checked = true;
      userCheckbox.current.indeterminate = false;
    }

    else {
      userCheckbox.current.checked = false;
      userCheckbox.current.indeterminate = true;
    }
  }, [userSelect.users]);

  const handleAllSelect = () => {
    if (!userCheckbox.current) return;
    if (!userCheckbox.current.checked) {
      userSelect.clear();
    }
    else {
      userSelect.setUser(props.users.map(u => u.user_id));
    }
  };

  return (
    <table className="table table-zebra border-collapse border-spacing-0 [&_td]:whitespace-nowrap">
      <thead>
        <tr className="[&>th]:bg-neutral-300 text-neutral-600 dark:[&>th]:bg-neutral-700 dark:text-neutral-300">
          <th className="w-14">
            <input
              ref={userCheckbox}
              onChange={handleAllSelect}
              type="checkbox"
              className="checkbox checkbox-primary"
            />
          </th>
          <th className="w-36">學號</th>
          { cols.map(col => <th key={col.value}>{col.name}</th>) }
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (
          <tr onDoubleClick={() => navigate(`/dashboard/users/${user.user_id}`)} key={user.user_id}>
            <td>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                onChange={userSelect.toggleUser}
                data-id={user.user_id}
                checked={userSelect.users.includes(user.user_id)}
              />
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
