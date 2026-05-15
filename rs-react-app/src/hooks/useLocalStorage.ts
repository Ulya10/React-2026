import { useState, useEffect } from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(
    () => localStorage.getItem(key) ?? initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
