import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiHamburger } from 'react-icons/pi';
import { BiLogOut } from 'react-icons/bi';
import clsx from 'clsx';
import useToggle from '@/hooks/useToggle';
import sidebar from '@/router/dashboardSidebar';
import useWindowSize from '@/hooks/useWindowSize';
import { useEffect } from 'react';

const variants = {
  open: { width: '240px' },
  close: { width: 0 }
};

type Props = {
  admin?: boolean;
};

function Dashboard({ admin }: Props) {
  const { width } = useWindowSize();
  const [nav, toggleNav, setNav] = useToggle();

  useEffect(() => {
    if (width && width >= 768) setNav(true);
  }, [width]);

  useEffect(() => {
    fetch('/api/auth/whoami')
      .then(response => response.json())
      .then((data) => {
        const name = data.GroupModel?.name;
        if (name) {
          if (admin && name !== 'ADMIN') {
            window.location.href = '/api/auth/google';
          }
        }
        else {
          window.location.href = '/api/auth/google';
        }
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="navbar bg-primary text-primary-content">
        <div className="flex-none">
          <button onClick={toggleNav} className="btn btn-square btn-primary shadow-none">
            <PiHamburger className="text-2xl" />
          </button>
        </div>
        <div className="flex-1">
          <Link to="/dashboard" className="btn btn-primary shadow-none text-xl">StuSys</Link>
        </div>
        <div className="flex-none">
          <a href="/api/auth/logout" className="btn btn-square btn-primary shadow-none">
            <BiLogOut className="text-2xl" />
          </a>
        </div>
      </header>
      <div className="flex flex-1 h-[calc(100dvh-64px)]">
        <motion.nav
          animate={nav ? 'open' : 'close'}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          variants={variants}
          className={clsx(
            'bg-base-300 w-0 h-[calc(100dvh-64px)] py-3',
            'z-30 absolute md:sticky flex flex-col',
            'overflow-x-hidden overflow-y-auto'
          )}
        >
          {
            sidebar.map(({ label, path, Before, After }) => (
              <Link
                key={path}
                className={clsx(
                  'btn btn-ghost justify-start mx-3',
                  'gap-x-3 flex-nowrap whitespace-nowrap',
                  '[&>*]:min-w-[min-content]'
                )}
                to={path}
              >
                {Before && <Before size="20px" />}
                <span>
                  {label}
                </span>
                {After && <After size="20px" />}
              </Link>
            ))

          }
        </motion.nav>
        <div
          onClick={() => setNav(false)}
          className={clsx(
            'md:hidden bg-neutral-900 w-screen absolute h-[calc(100dvh-64px)] z-20 opacity-40',
            { hidden: !nav }
          )}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
