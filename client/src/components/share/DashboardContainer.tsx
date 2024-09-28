import { ComponentProps } from 'react';
import clsx from 'clsx';

function DashboardContainer({ className, ...props }: ComponentProps<'main'>) {
  return (
    <main className={clsx(className, 'flex-1 w-full h-full max-w-[1300px] overflow-auto')} {...props}>
    </main>
  );
}

export default DashboardContainer;
