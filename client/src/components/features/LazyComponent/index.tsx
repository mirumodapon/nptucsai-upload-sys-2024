import { ReactNode } from 'react';
import { Suspense } from 'react';
import Loading from './Loading';

type Props = {
  children: ReactNode;
};

function LazyComponent({ children }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
}

export default LazyComponent;
