import { RouterProvider } from 'react-router-dom';
import ToastProvider from '@/components/features/toast/ToastProvider';
import router from '@/router';
import useTheme from '@/hooks/useTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 60 * 1000,
      gcTime: 3 * 60 * 1000,
      refetchInterval: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastProvider />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
