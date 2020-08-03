import { useRef } from 'react';

function useLast<T>(value: T): T | undefined {
  const currentValue = useRef<T>(value);
  const lastValue = useRef<T>();

  if (value !== currentValue.current) {
    lastValue.current = currentValue.current;
    currentValue.current = value;
  }

  return lastValue.current;
}

export default useLast;
