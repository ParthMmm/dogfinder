import { useState, useEffect } from "react";

export function useDebounce<T>({
  value,
  delay = 150,
}: {
  value: T;
  delay?: number;
}) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
