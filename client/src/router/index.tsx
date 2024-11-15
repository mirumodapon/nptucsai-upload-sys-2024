import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home';
import Admin from '@/pages/Admin';
import LazyComponent from '@/components/features/LazyComponent';
import Dashboard from '@/pages/Dashboard';

const SysInfo = lazy(() => import('@/pages/SysInfo'));
const GroupPage = lazy(() => import('@/pages/GroupPage'));
const CreateGroupPage = lazy(() => import('@/pages/CreateGroupPage'));
const UserPage = lazy(() => import('@/pages/UserPage'));
const FileUpload = lazy(() => import('@/pages/FileUpload'));
const PosterPage = lazy(() => import('@/pages/PosterPage'));
const BookPage = lazy(() => import('@/pages/BookPage'));
const DemoPage = lazy(() => import('@/pages/DemoPage'));
const ExpSetting = lazy(() => import ('@/pages/ExpSetting'));
const IndexSettingPage = lazy(() => import('@/pages/IndexSettingPage'));
const DashboardIndex = lazy(() => import('@/pages/DashboardIndex'));
const HintSetting = lazy(() => import('@/pages/HintSetting'));

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'files',
    element: <FileUpload />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: (
          <LazyComponent>
            <DashboardIndex />
          </LazyComponent>
        )
      },
      {
        path: 'poster',
        element: (
          <LazyComponent>
            <PosterPage />
          </LazyComponent>
        )
      },
      {
        path: 'book',
        element: (
          <LazyComponent>
            <BookPage />
          </LazyComponent>
        )
      },
      {
        path: 'demo',
        element: (
          <LazyComponent>
            <DemoPage />
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
      },
      {
        path: 'expsetting',
        element: (
          <LazyComponent>
            <ExpSetting />
          </LazyComponent>
        )
      },
      {
        path: 'indexsetting',
        element: (
          <LazyComponent>
            <IndexSettingPage />
          </LazyComponent>
        )
      },
      {
        path: 'hintsetting',
        element: (
          <LazyComponent>
            <HintSetting />
          </LazyComponent>
        )
      }
    ]
  }
], {
});
