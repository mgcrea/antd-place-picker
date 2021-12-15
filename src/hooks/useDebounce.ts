/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useMemo} from 'react';

export function useDebounce<T extends (...args: any[]) => any>(callback: T, wait: number): T {
  const debounced = useMemo(() => debounce(callback, wait), [callback, wait]);
  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);
  useEffect(() => {
    debounced.cancel();
  }, [debounced, callback, wait]);
  return debounced;
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T & {cancel: typeof clearTimeout} {
  let timer: NodeJS.Timeout | null = null;
  return Object.assign(
    (...args: any[]) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        func(...args);
      }, wait);
    },
    {
      cancel: () => {
        if (timer) {
          clearTimeout(timer);
        }
      },
    },
  ) as T & {cancel: typeof clearTimeout};
}
