const MP3QURAN_RADIOS = 'https://www.mp3quran.net/api/v3/radios?language=eng';

/**
 * Fetches radio/stream metadata from MP3 Quran public API (same family as Qurango streams).
 * Used to resolve a Makkah-style recitation URL when you want network-sourced adhan-related audio.
 * @returns {{ name: string, url: string } | null}
 */
export async function fetchAdhanRelatedAudioFromApi() {
  try {
    const res = await fetch(MP3QURAN_RADIOS);
    if (!res.ok) return null;
    const json = await res.json();
    const list = Array.isArray(json?.radios) ? json.radios : [];
    if (!list.length) return null;

    const normalize = (s) => String(s || '').toLowerCase();
    const scored = (r) => {
      const n = normalize(r.name);
      let score = 0;
      if (/makkah|mecca|مكة|saudi|harim|حرم|medina|madinah|haram/.test(n)) score += 5;
      if (/quran|قرآن|radio/.test(n)) score += 1;
      return score;
    };

    const sorted = [...list].sort((a, b) => scored(b) - scored(a));
    const pick = sorted[0];
    const url = pick?.url ? String(pick.url).replace(/\\/g, '') : null;
    if (!url) return null;
    return { name: pick.name, url };
  } catch {
    return null;
  }
}
