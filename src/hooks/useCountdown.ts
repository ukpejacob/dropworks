import { useState, useEffect } from "react";

export function useCountdown(secondsRemaining: number) {
  const [remaining, setRemaining] = useState(secondsRemaining);

  useEffect(() => {
    setRemaining(secondsRemaining);
  }, [secondsRemaining]);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const label =
    remaining <= 0
      ? "Expired"
      : hours > 0
      ? `${hours}h ${minutes}m`
      : minutes > 0
      ? `${minutes}m ${seconds}s`
      : `${seconds}s`;

  return { remaining, label };
}
