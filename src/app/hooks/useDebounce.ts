import { useEffect } from 'react';

export const useDebounce = (effect: () => void, delay: number) => {
  useEffect(() => {
    const timeout = setTimeout(effect, delay);
    return () => clearTimeout(timeout);
  }, [effect, delay]);
}