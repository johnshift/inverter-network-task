'use client';

import { useCallback, useEffect, useState } from 'react';

type UseCooldownReturn = {
  isActive: boolean;
  remaining: number;
  total: number;
  start: (newDuration?: number) => void;
};

export const useCooldown = (durationSeconds: number): UseCooldownReturn => {
  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(durationSeconds);

  useEffect(() => {
    if (remaining <= 0) return;

    const timer = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining]);

  const start = useCallback(
    (newDuration?: number) => {
      const duration = newDuration ?? durationSeconds;
      setTotal(duration);
      setRemaining(duration);
    },
    [durationSeconds],
  );

  return {
    isActive: remaining > 0,
    remaining,
    total,
    start,
  };
};
