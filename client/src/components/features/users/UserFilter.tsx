import { useMemo } from 'react';
import clsx from 'clsx';
import { MdOutlineFilterList, MdSearch } from 'react-icons/md';
import useUserFilter from '@/store/useUserFilter';
import { userRoleMap, userTypeMap } from '@/utils/user';

function UserFilter() {
  const { filter, setFilter, setSearch } = useUserFilter();
  const grades = useMemo(
    () => {
      const year = new Date().getFullYear();
      return Array.from({ length: 7 }, (_, k) => k + year - 1913);
    },
    []
  );

  return (
    <div className={clsx(
      'dropdown dropdown-bottom max-sm:dropdown-end',
      '[&_.tooltip:before]:focus-within:hidden',
      '[&_button_svg]:focus-within:text-secondary'
    )}
    >
      <div className="tooltip tooltip-bottom" data-tip="篩選器">
        <button className="btn btn-square btn-ghost">
          <MdOutlineFilterList size="25px" />
        </button>
      </div>

      <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-3 shadow gap-y-2">
        <label className="input input-bordered flex items-center gap-2 focus-within:outline-none">
          <MdSearch size="25px" />
          <input onBlur={setSearch} type="search" className="grow" placeholder="Search" />
        </label>
        <select
          onChange={setFilter}
          data-col="role"
          defaultValue={filter.role ?? '*'}
          className="select select-bordered w-full focus-within:outline-none"
        >
          <option value="*">所有類別</option>
          {
            Object.entries(userRoleMap)
              .map(role => <option key={role[0]} value={role[0]}>{role[1]}</option>)
          }
        </select>
        <select
          onChange={setFilter}
          data-col="type"
          defaultValue={filter.type ?? '*'}
          className="select select-bordered w-full focus-within:outline-none"
        >
          <option value="*">所有學制</option>
          {
            Object.entries(userTypeMap)
              .map(type => <option key={type[0]} value={type[0]}>{type[1]}</option>)
          }
        </select>
        <select
          onChange={setFilter}
          data-col="grade"
          defaultValue={filter.grade ?? '*'}
          className="select select-bordered w-full focus-within:outline-none"
        >
          <option value="*">所有級數</option>
          {
            grades
              .map(grade => <option key={grade} value={grade}>{`${grade} 級`}</option>)
          }
        </select>
      </div>
    </div>
  );
}

export default UserFilter;
