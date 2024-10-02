import UserFilter from './UserFilter';
import UserColumn from './UserColumn';
import { TbUserPlus, TbUserMinus, TbUserEdit } from 'react-icons/tb';
import { ComponentProps } from 'react';

function UserToolkit(props: Props) {
  return (
    <div {...props}>
      <div className="tooltip tooltip-bottom" data-tip="新增用戶">
        <button className="btn btn-square btn-ghost">
          <TbUserPlus size="25px" />
        </button>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="刪除用戶">
        <button className="btn btn-square btn-ghost">
          <TbUserMinus size="25px" />
        </button>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="編輯用戶">
        <button className="btn btn-square btn-ghost">
          <TbUserEdit size="25px" />
        </button>
      </div>
      <UserFilter />
      <UserColumn />
    </div>
  );
}

export default UserToolkit;

type Props = ComponentProps<'div'>;
