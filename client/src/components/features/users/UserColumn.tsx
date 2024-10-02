import clsx from 'clsx';
import { FiColumns } from 'react-icons/fi';
import useUserColumn from '@/store/useUserColumn';

function UserColumn() {
  const userColumn = useUserColumn();

  return (
    <div className={clsx(
      'dropdown dropdown-bottom max-sm:dropdown-end',
      '[&_.tooltip:before]:focus-within:hidden',
      '[&_svg]:focus-within:text-secondary'
    )}
    >
      <div className="tooltip tooltip-bottom" data-tip="欄位選擇">
        <button className="btn btn-square btn-ghost">
          <FiColumns size="25px" />
        </button>
      </div>

      <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 shadow">
        { userColumn.cols.map(col => (
          <label key={col.value} className="cursor-pointer label justify-start gap-x-3">
            <input
              type="checkbox"
              value={col.value}
              checked={col.checked}
              onChange={userColumn.setCol}
              className="checkbox checkbox-accent"
            />
            <span className="label-text">{col.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default UserColumn;
