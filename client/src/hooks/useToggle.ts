import { useCallback, useState, Dispatch, SetStateAction } from 'react';

type UseToggleReturn = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

function useToggle(defaultValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(defaultValue);

  const onToggle = useCallback(() => {
    setValue(state => !state);
  }, []);

  return [value, onToggle, setValue];
}

export default useToggle;
