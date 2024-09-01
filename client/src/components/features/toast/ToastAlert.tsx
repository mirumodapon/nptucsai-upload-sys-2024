import { ComponentProps } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { MdCheckCircleOutline, MdInfoOutline, MdOutlineWarningAmber, MdErrorOutline, MdClose } from 'react-icons/md';
import clsx from 'clsx';
import useToast from '@/hooks/useToast';

type Props = {
  type: 'info' | 'success' | 'warning' | 'error';
  exit?: boolean;
  toastKey: string;
} & ComponentProps<'span'> & MotionProps;

const variants = {
  enter: { x: [120, 0], opacity: [0, 1] },
  exit: { opacity: [1, 0] }
};

function ToastAlert(props: Props) {
  const { children, className, type, toastKey, ...opts } = props;
  const removeToast = useToast(state => state.removeToast);

  return (
    <motion.span
      animate={props.exit ? 'exit' : 'enter'}
      variants={variants}
      className={clsx(
        className,
        'px-2 py-3 relative',
        'flex flex-row items-center gap-x-2',
        'rounded-lg',
        `bg-${type} text-${type}-content`
      )}
      {...opts}
    >
      { type === 'info' && <MdInfoOutline className="text-2xl" /> }
      { type === 'success' && <MdCheckCircleOutline className="text-2xl" /> }
      { type === 'warning' && <MdOutlineWarningAmber className="text-2xl" /> }
      { type === 'error' && <MdErrorOutline className="text-2xl" /> }
      <MdClose onClick={() => removeToast(toastKey)} className="absolute top-1 right-1 text-sm cursor-pointer" />
      {children}
    </motion.span>
  );
}

export default ToastAlert;
