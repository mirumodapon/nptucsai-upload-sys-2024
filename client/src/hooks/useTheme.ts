import { useEffect, useCallback } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

function useTheme() {
  const { value, setValue } = useLocalStorage({ key: 'THEME' });

  const toggleTheme = useCallback(() => {
    if (value === 'light') setValue('dark');
    else if (value === 'dark') setValue(undefined);
    else if (value === undefined) setValue('light');
    else setValue(undefined);
  }, [value]);

  useEffect(() => {
    document.querySelector('html')!.setAttribute('data-theme', value ?? '');
  }, [value]);

  return { theme: value, toggleTheme };
}

export default useTheme;
