import { Fragment } from 'react';
import { RouterProvider } from 'react-router-dom';
import ToastProvider from '@/components/features/toast/ToastProvider';
import router from '@/router';
import useTheme from '@/hooks/useTheme';

function App() {
  useTheme();

  return (
    <Fragment>
      <RouterProvider router={router} />
      <ToastProvider />
    </Fragment>
  );
}

export default App;
