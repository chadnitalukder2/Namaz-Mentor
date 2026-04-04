const BASE_URL = 'https://api.aladhan.com/v1';

export function formatLocalDateForApi(date = new Date()) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

/**
 * Fetch today's prayer timings for coordinates (AlAdhan API).
 * @param {number} latitude
 * @param {number} longitude
 * @param {object} [options]
 * @param {string} [options.date] DD-MM-YYYY (local device calendar day)
 * @param {number} [options.method] Calculation method id (see API docs); omit for API default
 */
export async function fetchTimingsByCoordinates(latitude, longitude, options = {}) {
  const date = options.date ?? formatLocalDateForApi();
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
  });
  if (options.method != null) params.set('method', String(options.method));

  const url = `${BASE_URL}/timings/${date}?${params.toString()}`;
  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.code !== 200 || !json.data?.timings) {
    const msg = json?.data || json?.status || res.statusText || 'Prayer times request failed';
    throw new Error(typeof msg === 'string' ? msg : 'Prayer times request failed');
  }

  return json.data.timings;
}
