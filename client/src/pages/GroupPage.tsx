import { Link } from 'react-router-dom';
import { useGroup } from '@/service/useGroup';
import { MdDeleteOutline } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';
import useToast from '@/hooks/useToast';

function GroupPage() {
  const { data } = useGroup();
  const toast = useToast();
  const query = useQueryClient();

  const deleteGroup = async (id: string) => {
    const _confirm = confirm('確定要刪除嗎?');
    if (!_confirm) return;

    const response = await fetch(`/api/groups/${id}`, { method: 'delete' });
    if (response.ok) {
      toast.addToast({
        key: `DELETE_GROUP${Date.now()}`,
        type: 'error',
        message: '刪除成功(這是一個紅色的成功)',
        during: 5000
      });
    }
    else {
      toast.addToast({
        key: `DELETE_GROUP${Date.now()}`,
        type: 'error',
        message: '刪除失敗',
        during: 3000
      });
    }

    query.invalidateQueries({ queryKey: ['group'], refetchType: 'all' });
  };

  return (
    <div className="w-full overflow-x-auto p-5">
      <Link to="/admin/new-group" className="p-3 btn btn-warning text-warning-content">新增群組</Link>
      <a className="mx-2 btn btn-info" href="/api/groups/files" download="專題">下載檔案</a>
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
                <th>
                  {group.group_id}
                </th>
                <td>
                  <span className="w-full flex gap-3">
                    <MdDeleteOutline size="20px" onClick={() => deleteGroup(group.group_id)} />
                    {group.name}
                  </span>
                </td>
                {
                  group.files.book
                    ? <td>{group.files?.book.filename}</td>
                    : <td className="text-red-500">未上傳</td>
                }
                {
                  group.files.poster
                    ? <td>{group.files?.poster.filename}</td>
                    : <td className="text-red-500">未上傳</td>
                }
                {
                  group.files.ppt
                    ? <td>{group.files?.ppt.filename}</td>
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
