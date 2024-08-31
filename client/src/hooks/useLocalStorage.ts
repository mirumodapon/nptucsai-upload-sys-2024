import { useState, useEffect } from 'react';

interface Props {
  key: string;
  defaultValue?: string;
  force?: boolean;
}

function useLocalStorage(props: Props) {
  const { key, force = false } = props;
  const defaultValue = window.localStorage.getItem(key) ?? props.defaultValue;
  const [value, setValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    if (force) setValue(defaultValue);
  }, []);

  useEffect(() => {
    if (value === undefined)
      window.localStorage.removeItem(key);
    else
      window.localStorage.setItem(key, value);
  }, [value]);

  return { value, setValue };
}

export default useLocalStorage;
