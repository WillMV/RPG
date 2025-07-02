import { useState, useEffect } from "react";

export const useDebounce = <T>({
  initialValue,
  onDebounce,
  delay = 300,
}: {
  initialValue?: T;
  onDebounce: (value?: T) => void;
  delay?: number;
}) => {
  const [value, setValue] = useState<T | undefined>(initialValue ?? undefined);

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebounce?.(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, onDebounce]);

  return { setValue, value } as const;
};
