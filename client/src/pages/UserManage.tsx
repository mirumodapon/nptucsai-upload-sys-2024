import { motion } from 'framer-motion';
import DashboardContainer from '@/components/share/DashboardContainer';
import UserTable from '@/components/features/users/UserTable';
import useUser from '@/service/useUser';
import Pagination from '@/components/share/Pagination';
import UserToolkit from '@/components/features/users/UserToolkit';

function UserManage() {
  const { data, page, setPage } = useUser();
  const total = Math.ceil(data!.total / data!.limit);

  return (
    <DashboardContainer className="w-full overflow-x-hidden overflow-y-auto m-auto p-5">
      <motion.section
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="w-full my-2 sm:flex"
      >
        <UserToolkit className="flex justify-center" />
        <Pagination
          className="flex-1 justify-center sm:justify-end"
          total={total}
          page={data!.page}
          onFirst={() => setPage(1)}
          onPrev={() => page > 1 && setPage(s => s - 1)}
          onNext={() => page < total && setPage(s => s + 1)}
          onLast={() => setPage(total)}
        />
      </motion.section>
      <motion.section
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="w-full overflow-auto border-2 border-neutral-300 dark:border-neutral-700 rounded-lg"
      >
        <UserTable
          total={data!.total}
          users={data!.users}
        />
      </motion.section>
    </DashboardContainer>
  );
}

export default UserManage;
