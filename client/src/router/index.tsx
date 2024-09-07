import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Test from '@/pages/Test';
import Dashboard from '@/pages/Dashboard';
import LazyComponent from '@/components/features/LazyComponent';

const UserManage = lazy(() => import('@/pages/UserManage'));
const SysInfo = lazy(() => import('@/pages/SysInfo'));

export default createBrowserRouter([
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'users',
        element: (
          <LazyComponent>
            <UserManage />
          </LazyComponent>
        )
      },
      {
        path: 'sys',
        element: (
          <LazyComponent>
            <SysInfo />
          </LazyComponent>
        )
      }
    ]
  }
], {
});
