/** @typedef {{ id: string, name: string, icon: string, time: string, rawTime: string, minutes: number, completed?: boolean }} PrayerRow */

function rawTimeToParts(rawTime) {
  const token = String(rawTime).trim().split(/\s+/)[0];
  const [h, m] = token.split(':').map((x) => parseInt(x, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return { hours: h, minutes: m };
}

export function minutesFromMidnight(rawTime) {
  const parts = rawTimeToParts(rawTime);
  if (!parts) return 0;
  return parts.hours * 60 + parts.minutes;
}

export function formatTime12h(rawTime) {
  const parts = rawTimeToParts(rawTime);
  if (!parts) return String(rawTime);
  const { hours, minutes } = parts;
  const period = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  const mm = String(minutes).padStart(2, '0');
  return `${h12}:${mm} ${period}`;
}

/**
 * @param {Record<string, string>} timings — AlAdhan `data.timings`
 * @param {Array<{ id: string, name: string, icon: string, timingKey: string }>} definitions
 * @returns {PrayerRow[]}
 */
export function buildPrayerRows(timings, definitions) {
  return definitions.map((def) => {
    const raw = timings[def.timingKey];
    if (!raw) throw new Error(`Missing timing: ${def.timingKey}`);
    return {
      id: def.id,
      name: def.name,
      icon: def.icon,
      rawTime: String(raw).trim().split(/\s+/)[0],
      time: formatTime12h(raw),
      minutes: minutesFromMidnight(raw),
    };
  });
}

/** Normalize static fallback rows to the same shape as {@link buildPrayerRows}. */
export function normalizeFallbackRows(rows) {
  return rows.map((p) => ({
    ...p,
    rawTime: String(p.rawTime).trim().split(/\s+/)[0],
    time: p.time || formatTime12h(p.rawTime),
    minutes: minutesFromMidnight(p.rawTime),
  }));
}

/**
 * @param {PrayerRow[]} prayers
 * @param {object} [opts]
 * @param {string|null} [opts.nextIsTomorrowForId] — prayer id whose next occurrence is tomorrow (e.g. Fajr after Isha)
 */
export function applyCompletion(prayers, opts = {}) {
  const { nextIsTomorrowForId = null } = opts;
  const now = Date.now();
  return prayers.map((p) => {
    let completed = timingToLocalDate(p.rawTime, 0).getTime() <= now;
    if (nextIsTomorrowForId && p.id === nextIsTomorrowForId) completed = false;
    return { ...p, completed };
  });
}

/**
 * @param {PrayerRow[]} ordered — Fajr → … → Isha for same day
 * @returns {{ prayer: PrayerRow, targetDate: Date, isTomorrow: boolean }}
 */
export function getNextPrayerAndTarget(ordered) {
  const now = Date.now();
  for (const p of ordered) {
    const target = timingToLocalDate(p.rawTime, 0);
    if (target.getTime() > now) return { prayer: p, targetDate: target, isTomorrow: false };
  }
  const fajr = ordered[0];
  return {
    prayer: fajr,
    targetDate: timingToLocalDate(fajr.rawTime, 1),
    isTomorrow: true,
  };
}

/**
 * @param {string} rawTime "HH:mm"
 * @param {number} dayOffset 0 = today, 1 = tomorrow
 */
export function timingToLocalDate(rawTime, dayOffset) {
  const parts = rawTimeToParts(rawTime);
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(0, 0, 0, 0);
  if (!parts) return d;
  d.setHours(parts.hours, parts.minutes, 0, 0);
  return d;
}
