import { useEffect, useState } from 'react';

export const useDeferToNextTick = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(id);
  }, []);

  return ready;
};
