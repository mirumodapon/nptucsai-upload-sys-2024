import { Fragment } from 'react';
import { RouterProvider } from 'react-router-dom';
import ToastProvider from '@/components/features/toast/ToastProvider';
import router from '@/router';

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
      <ToastProvider />
    </Fragment>
  );
}

export default App;
