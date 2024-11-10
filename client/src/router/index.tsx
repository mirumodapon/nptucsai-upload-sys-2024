import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Test from '@/pages/Test';
import Admin from '@/pages/Admin';
import LazyComponent from '@/components/features/LazyComponent';

const SysInfo = lazy(() => import('@/pages/SysInfo'));
const GroupPage = lazy(() => import('@/pages/GroupPage'));
const CreateGroupPage = lazy(() => import('@/pages/CreateGroupPage'));
const UserPage = lazy(() => import('@/pages/UserPage'));
const FileUpload = lazy(() => import('@/pages/FileUpload'));

export default createBrowserRouter([
  {
    path: '/test',
    element: <Test />
  },
  {
    path: 'files',
    element: <FileUpload />
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: 'sys',
        element: (
          <LazyComponent>
            <SysInfo />
          </LazyComponent>
        )
      },
      {
        path: 'users',
        element: (
          <LazyComponent>
            <UserPage />
          </LazyComponent>
        )
      },
      {
        path: 'groups',
        element: (
          <LazyComponent>
            <GroupPage />
          </LazyComponent>
        )
      },
      {
        path: 'new-group',
        element: (
          <LazyComponent>
            <CreateGroupPage />
          </LazyComponent>
        )

      }
    ]
  }
], {
});
