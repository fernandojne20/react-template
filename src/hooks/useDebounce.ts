import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    // Si value cambia antes del delay, se cancela el timeout anterior
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
