import { createBrowserRouter } from 'react-router-dom';

import Test from '@/pages/Test';
import Dashboard from '@/pages/Dashboard';

export default createBrowserRouter([
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: []
  }
], {
});
