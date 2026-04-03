import { useState, useEffect } from 'react';
import { PRAYERS } from '../constants/data';

/**
 * usePrayerTimes
 * In a real app this would call an API like aladhan.com using the device location.
 * For now it returns static data from constants.
 */
export function usePrayerTimes(location = 'Sylhet') {
  const [prayers, setPrayers] = useState(PRAYERS);
  const [loading, setLoading] = useState(false);
  const [nextPrayer, setNextPrayer] = useState(null);

  useEffect(() => {
    // Find the next un-completed prayer
    const next = prayers.find((p) => !p.completed);
    setNextPrayer(next || prayers[0]);
  }, [prayers]);

  const markPrayerCompleted = (prayerId) => {
    setPrayers((prev) =>
      prev.map((p) => (p.id === prayerId ? { ...p, completed: true } : p))
    );
  };

  return { prayers, nextPrayer, loading, markPrayerCompleted };
}

/**
 * useCountdown
 * Counts down from the given start time in seconds.
 */
export function useCountdown(totalSeconds = 943) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const pad = (n) => String(n).padStart(2, '0');
  return {
    display: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    hours,
    minutes,
    seconds,
    remaining,
  };
}

/**
 * useTasbih
 * Manages a tasbih (dhikr counter) session.
 */
export function useTasbih(initialTarget = 33) {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(initialTarget);
  const [sessions, setSessions] = useState(0);

  const increment = () => {
    setCount((c) => {
      if (c + 1 >= target) {
        setSessions((s) => s + 1);
        return c + 1;
      }
      return c + 1;
    });
  };

  const reset = () => {
    setCount(0);
  };

  const isComplete = count >= target;

  return { count, target, setTarget, increment, reset, isComplete, sessions };
}

/**
 * useQibla
 * In a real app, this uses device compass + calculated Qibla bearing.
 * Returns a static mock value for now.
 */
export function useQibla() {
  const [qiblaDegrees] = useState(282); // mock: London facing roughly SW toward Makkah
  const [compassHeading, setCompassHeading] = useState(0);

  // Simulate compass rotation
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle = (angle + 0.5) % 360;
      setCompassHeading(angle);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return {
    qiblaDegrees,
    compassHeading,
    distanceKm: 10247,
    locationName: 'Makkah, Saudi Arabia',
  };
}
