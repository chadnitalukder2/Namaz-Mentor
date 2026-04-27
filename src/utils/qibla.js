/** Al-Masjid al-Haram — Kaaba (approximate center of the Sacred Mosque). */
export const KAABA_LAT = 21.422487;
export const KAABA_LNG = 39.826206;

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const EARTH_RADIUS_KM = 6371;

function normalizeDeg(deg) {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/**
 * Initial compass bearing from (lat1,lng1) to (lat2,lng2), degrees clockwise from true north.
 */
export function initialBearingDeg(lat1, lng1, lat2, lng2) {
  const φ1 = lat1 * DEG2RAD;
  const φ2 = lat2 * DEG2RAD;
  const Δλ = (lng2 - lng1) * DEG2RAD;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x) * RAD2DEG;
  return normalizeDeg(θ);
}

export function bearingToKaabaDeg(lat, lng) {
  return initialBearingDeg(lat, lng, KAABA_LAT, KAABA_LNG);
}

export function distanceToKaabaKm(lat, lng) {
  const φ1 = lat * DEG2RAD;
  const φ2 = KAABA_LAT * DEG2RAD;
  const Δφ = (KAABA_LAT - lat) * DEG2RAD;
  const Δλ = (KAABA_LNG - lng) * DEG2RAD;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/** Shortest signed difference a → b in degrees, range (-180, 180]. */
export function angleDeltaDeg(from, to) {
  return ((to - from + 540) % 360) - 180;
}

/** 16-point compass rose label for a clockwise bearing from north (0–360°). */
const ROSE_16 = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

export function bearingToCompassRose16(deg) {
  if (deg == null || Number.isNaN(deg)) return '—';
  const d = ((deg % 360) + 360) % 360;
  const i = Math.round(d / 22.5) % 16;
  return ROSE_16[i];
}

/**
 * User-facing turn hint from device heading (top of phone vs true north) and Qibla bearing.
 */
/**
 * @returns {{ turnSide: 'left' | 'right' | 'aligned' | null, ionicon: string }}
 * turnSide: clockwise from current heading → 'right'; counter-clockwise → 'left'.
 */
export function turnHintFromHeading(bearingDeg, headingDeg) {
  if (headingDeg == null || Number.isNaN(headingDeg)) {
    return {
      turnSide: null,
      ionicon: 'compass-outline',
    };
  }
  const delta = angleDeltaDeg(headingDeg, bearingDeg);
  const ad = Math.abs(delta);
  if (ad < 6) {
    return {
      turnSide: 'aligned',
      ionicon: 'checkmark-circle',
    };
  }
  if (delta > 0) {
    return {
      turnSide: 'right',
      ionicon: 'arrow-forward-circle-outline',
    };
  }
  return {
    turnSide: 'left',
    ionicon: 'arrow-back-circle-outline',
  };
}
