const BASE_URL = 'https://api.alquran.cloud/v1';

/**
 * Fetch all surah metadata from Al Quran Cloud (no API key).
 * @returns {Promise<Array<{ id: number, name: string, translation: string, ayahs: number, arabicName: string, revelationType: string }>>}
 */
export async function fetchAllSurahs() {
  const url = `${BASE_URL}/surah`;
  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.code !== 200 || !Array.isArray(json.data)) {
    const msg =
      json?.status || json?.data || res.statusText || 'Could not load Quran surah list';
    throw new Error(typeof msg === 'string' ? msg : 'Could not load Quran surah list');
  }

  return json.data.map((s) => ({
    id: s.number,
    name: s.englishName,
    translation: s.englishNameTranslation,
    ayahs: s.numberOfAyahs,
    arabicName: s.name,
    revelationType: s.revelationType,
  }));
}

/**
 * MP3 URLs per ayah (in order) for a surah. Reciter edition id = Alafasy on Islamic Network CDN.
 * @param {number} surahNumber 1–114
 * @param {string} [editionId='ar.alafasy']
 * @returns {Promise<string[]>}
 */
export async function fetchSurahAudioUrls(surahNumber, editionId = 'ar.alafasy') {
  const url = `${BASE_URL}/surah/${surahNumber}/${editionId}`;
  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.code !== 200 || !json.data?.ayahs) {
    const msg =
      json?.status || json?.data || res.statusText || 'Could not load audio for this surah';
    throw new Error(typeof msg === 'string' ? msg : 'Could not load audio for this surah');
  }

  return json.data.ayahs.map((a) => a.audio).filter(Boolean);
}
