import { Link } from 'react-router-dom';
import { useGroup } from '@/service/useGroup';

function GroupPage() {
  const { data } = useGroup();

  return (
    <div className="w-full p-5">
      <Link to="/admin/new-group" className="p-3 btn btn-warning text-warning-content">新增群組</Link>
      <div className="overflow-x-auto whitespace-nowrap">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>報告書</th>
              <th>海報</th>
              <th>簡報</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(group => (
              <tr key={group.group_id}>
                <th>{group.group_id}</th>
                <td>{group.name}</td>
                {
                  group.files.book
                    ? <td>{group.files?.book.filename}</td>
                    : <td className="text-red-500">未上傳</td>
                }
                {
                  group.files.poster
                    ? <td>{group.files?.book.filename}</td>
                    : <td className="text-red-500">未上傳</td>
                }
                {
                  group.files.ppt
                    ? <td>{group.files?.book.filename}</td>
                    : <td className="text-red-500">未上傳</td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupPage;
