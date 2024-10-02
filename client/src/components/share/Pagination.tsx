import { ComponentProps } from 'react';
import clsx from 'clsx';
import { MdFirstPage, MdLastPage, MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

function Pagination({
  total,
  page,
  onFirst,
  onPrev,
  onNext,
  onLast,
  className,
  ...props
}: Props) {
  return (
    <div
      className={clsx('flex items-center [&_button]:btn [&_button]:btn-ghost [&_button]:btn-square', className)}
      {...props}
    >
      <button onClick={onFirst}>
        <MdFirstPage size="25px" />
      </button>
      <button onClick={onPrev}>
        <MdOutlineNavigateBefore size="25px" />
      </button>
      <label className="btn btn-ghost">
        {`${page} / ${total}`}
      </label>
      <button onClick={onNext}>
        <MdOutlineNavigateNext size="25px" />
      </button>
      <button onClick={onLast}>
        <MdLastPage size="25px" />
      </button>
    </div>
  );
}

export default Pagination;

type Props = ComponentProps<'div'> & {
  total: number | string;
  page: number | string;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLast: () => void;
};
