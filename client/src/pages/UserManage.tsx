import DashboardContainer from '@/components/share/DashboardContainer';
import UserTable from '@/components/features/users/UserTable';
import useUser from '@/service/useUser';

function UserManage() {
  const { data } = useUser();

  return (
    <DashboardContainer className="m-auto p-3">
      <section className="p-2 border-2 border-base-200 rounded-lg">
        <UserTable users={data!.users} />
      </section>
    </DashboardContainer>
  );
}

export default UserManage;
