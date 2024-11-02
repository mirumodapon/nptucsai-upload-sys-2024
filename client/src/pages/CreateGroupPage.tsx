import { useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import useUser from '@/service/useUser';

type I_User = {
  user_id: string;
  username: string;
};

function CreateGroupPage() {
  const { data } = useUser();
  const userIdInput = useRef<HTMLInputElement | null>(null);
  const usernameInput = useRef<HTMLInputElement | null>(null);
  const [users, setUsers] = useState<I_User[]>([]);

  const changeIdInput = () => {
    if (!userIdInput.current || !usernameInput.current) return;

    const id = userIdInput.current.value;
    const user = data?.find(x => x.user_id === id);
    if (!user) return;

    usernameInput.current.value = user.username;
  };

  const addUser = () => {
    if (!userIdInput.current || !usernameInput.current) return;

    const user_id = userIdInput.current.value;
    const username = usernameInput.current.value;

    setUsers(s => ([...s, { user_id, username }]));

    userIdInput.current.value = usernameInput.current.value = '';
  };

  const delUser = (id: string) => {
    setUsers(s => s.filter(x => x.user_id !== id));
  };

  return (
    <div className="p-5 w-full max-w-[750px]">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">專題名稱</span>
        </div>
        <input type="text" className="input input-bordered w-full" />
      </label>
      <div className="my-7 pt-5 flex flex-wrap w-full gap-3 border-t-2 border-grey-500">
        <label className="flex-1 input input-bordered flex items-center gap-2">
          <input ref={userIdInput} onChange={changeIdInput} type="text" className="grow" placeholder="學號" />
        </label>
        <label className="flex-1 input input-bordered flex items-center gap-2">
          <input ref={usernameInput} type="text" className="grow" placeholder="姓名" />
        </label>
        <button onClick={addUser} className="btn btn-ghost bg-green-400 hover:bg-green-500">加入</button>
      </div>
      <div className="flex flex-wrap gap-2">
        { users.map(user => (
          <div key={user.user_id} className="badge badge-info badge-lg gap-2">
            <IoClose onClick={() => delUser(user.user_id)} />
            {`${user.username} <${user.user_id}>`}
          </div>
        ))}
      </div>

      <div className="mt-10 mb-3">
        <button className="btn btn-ghost bg-green-400 hover:bg-green-500">儲存</button>
      </div>
    </div>
  );
}

export default CreateGroupPage;
