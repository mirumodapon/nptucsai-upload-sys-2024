import { ComponentProps } from 'react';
import { IconContext } from 'react-icons';
import { MdOutlineLightMode, MdOutlineDarkMode, MdOutlineAutoMode } from 'react-icons/md';
import useTheme from '@/hooks/useTheme';

interface Props extends ComponentProps<'span'> {
  iconProps?: IconContext;
}

function ThemeSwitch({ iconProps, ...props }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <span {...props} onClick={toggleTheme}>
      { theme === 'light' && <MdOutlineLightMode {...iconProps} />}
      { theme === 'dark' && <MdOutlineDarkMode {...iconProps} />}
      { theme === undefined && <MdOutlineAutoMode {...iconProps} />}
    </span>
  );
}

export default ThemeSwitch;
