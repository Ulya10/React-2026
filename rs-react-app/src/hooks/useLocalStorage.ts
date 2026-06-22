import { useState, useEffect } from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(
    
    () => {if (typeof window === 'undefined') return initialValue;
     return localStorage.getItem(key) ?? initialValue}
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
