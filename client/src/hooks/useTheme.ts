import { useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

function useTheme() {
  const { value, setValue } = useLocalStorage({ key: 'THEME' });

  const toggleTheme = () => {
    if (value === 'light') setValue('dark');
    else if (value === 'dark') setValue(undefined);
    else if (value === undefined) setValue('light');
    else setValue(undefined);
  };

  useEffect(() => {
    document.querySelector('html')!.setAttribute('data-theme', value ?? '');
  }, [value]);

  return { theme: value, toggleTheme };
}

export default useTheme;
