import { Link } from 'react-router-dom';
import useGroup from '@/service/useGroup';

function GroupPage() {
  const { data } = useGroup();

  return (
    <div className="p-5">
      <Link to="/dashboard/new-group" className="p-3 btn btn-warning text-warning-content">新增群組</Link>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(group => (
              <tr key={group.group_id}>
                <th>{group.group_id}</th>
                <td>{group.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupPage;
