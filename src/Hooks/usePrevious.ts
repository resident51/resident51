import { useRef, useEffect } from 'react';

function usePrevious<Type>(value: Type) {
  const ref = useRef<Type>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;