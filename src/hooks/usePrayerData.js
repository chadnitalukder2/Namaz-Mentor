import { useState, useEffect, useMemo } from 'react';
import * as Location from 'expo-location';
import {
  PRAYER_DEFINITIONS,
  FALLBACK_LOCATION,
  FALLBACK_PRAYERS,
} from '../constants/data';
import { fetchTimingsByCoordinates } from '../services/aladhan';
import {
  buildPrayerRows,
  applyCompletion,
  getNextPrayerAndTarget,
  normalizeFallbackRows,
} from '../utils/prayerTimes';

/**
 * Loads today's timings from AlAdhan using device location (or fallback coordinates).
 */
export function usePrayerTimes() {
  const [baseRows, setBaseRows] = useState(() => normalizeFallbackRows(FALLBACK_PRAYERS));
  const [locationLabel, setLocationLabel] = useState(FALLBACK_LOCATION.name);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      let lat = FALLBACK_LOCATION.latitude;
      let lng = FALLBACK_LOCATION.longitude;
      let label = FALLBACK_LOCATION.name;
      let usedDeviceLocation = false;

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const pos = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          lat = pos.coords.latitude;
          lng = pos.coords.longitude;
          usedDeviceLocation = true;
          try {
            const places = await Location.reverseGeocodeAsync({
              latitude: lat,
              longitude: lng,
            });
            const place = places[0];
            if (place) {
              const parts = [place.city || place.subregion, place.region, place.country].filter(
                Boolean
              );
              label = parts.length ? parts.join(', ') : place.name || label;
            } else {
              label = `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
            }
          } catch {
            label = `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
          }
        }
      } catch {
        // keep fallback lat/lng + label
      }

      try {
        const timings = await fetchTimingsByCoordinates(lat, lng);
        if (cancelled) return;
        const rows = buildPrayerRows(timings, PRAYER_DEFINITIONS);
        setBaseRows(rows);
        setLocationLabel(usedDeviceLocation ? label : FALLBACK_LOCATION.name);
      } catch {
        if (cancelled) return;
        setBaseRows(normalizeFallbackRows(FALLBACK_PRAYERS));
        setLocationLabel(
          usedDeviceLocation ? `${label} · offline times` : `${FALLBACK_LOCATION.name} · offline`
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const { nextPrayer, targetDate, isTomorrow } = useMemo(
    () => getNextPrayerAndTarget(baseRows),
    [baseRows, tick]
  );

  const prayers = useMemo(
    () =>
      applyCompletion(baseRows, {
        nextIsTomorrowForId: isTomorrow ? nextPrayer?.id : null,
      }),
    [baseRows, tick, isTomorrow, nextPrayer?.id]
  );

  return { prayers, nextPrayer, nextPrayerAt: targetDate, locationLabel, loading };
}

export function useCountdownToDate(targetDate) {
  const [, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  if (!targetDate) return '00:00:00';
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  const totalSec = Math.floor(diff / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
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
