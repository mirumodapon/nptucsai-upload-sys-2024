import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiHamburger } from 'react-icons/pi';
import clsx from 'clsx';
import useToggle from '@/hooks/useToggle';

const variants = {
  open: { width: '240px' },
  close: { width: 0 }
};

function Dashboard() {
  const [nav, toggleNav, setNav] = useToggle(true);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="navbar bg-primary text-primary-content">
        <div className="flex-none">
          <button onClick={toggleNav} className="btn btn-square btn-primary shadow-none">
            <PiHamburger className="text-2xl" />
          </button>
        </div>
        <div className="flex-1">
          <Link to="#" className="btn btn-primary shadow-none text-xl">StuSys</Link>
        </div>
        <div className="flex-none">
        </div>
      </header>
      <div className="flex flex-1 h-full">
        <motion.nav
          animate={nav ? 'open' : 'close'}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          variants={variants}
          className="bg-base-300 w-[240px] h-full z-30 fixed md:sticky"
        >
        </motion.nav>
        <div
          onClick={() => setNav(false)}
          className={clsx(
            'md:hidden bg-base-300 w-screen fixed h-[calc(100dvh-64px)] z-20 opacity-40',
            { hidden: !nav }
          )}
        />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
