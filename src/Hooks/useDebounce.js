import { useCallback, useRef } from 'react';

export default function useDebounce(cb, delay) {
  //debugger;
  const timer = useRef();
  const deboucedCallback = useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        cb(...args);
      }, delay);
    },
    [cb, delay],
  );
  return deboucedCallback;
}
