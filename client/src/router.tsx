import { createBrowserRouter } from 'react-router-dom';

import Test from '@/pages/Test';

export default createBrowserRouter([
  {
    path: '/test',
    element: <Test />
  }
], {
});
