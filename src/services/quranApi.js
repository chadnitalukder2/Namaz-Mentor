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

/**
 * Ayah rows for the reader UI: Arabic (Uthmani), English (Sahih Intl.), optional transliteration.
 * @param {number} surahNumber 1–114
 * @returns {Promise<Array<{ number: number, arabic: string, translation: string, transliteration: string }>>}
 */
export async function fetchSurahAyahs(surahNumber) {
  const arUrl = `${BASE_URL}/surah/${surahNumber}/quran-uthmani`;
  const enUrl = `${BASE_URL}/surah/${surahNumber}/en.sahih`;
  const trUrl = `${BASE_URL}/surah/${surahNumber}/en.transliteration`;

  const [arRes, enRes] = await Promise.all([fetch(arUrl), fetch(enUrl)]);
  const [arJson, enJson] = await Promise.all([
    arRes.json().catch(() => ({})),
    enRes.json().catch(() => ({})),
  ]);

  if (!arRes.ok || arJson.code !== 200 || !Array.isArray(arJson.data?.ayahs)) {
    const msg =
      arJson?.status || arJson?.data || arRes.statusText || 'Could not load Arabic text for this surah';
    throw new Error(typeof msg === 'string' ? msg : 'Could not load Arabic text for this surah');
  }

  const enAyahs = enRes.ok && enJson.code === 200 && Array.isArray(enJson.data?.ayahs) ? enJson.data.ayahs : [];

  let trAyahs = [];
  try {
    const trRes = await fetch(trUrl);
    const trJson = await trRes.json().catch(() => ({}));
    if (trRes.ok && trJson.code === 200 && Array.isArray(trJson.data?.ayahs)) {
      trAyahs = trJson.data.ayahs;
    }
  } catch {
    trAyahs = [];
  }

  return arJson.data.ayahs.map((a, idx) => ({
    number: a.numberInSurah ?? a.number ?? idx + 1,
    arabic: a.text ?? '',
    translation: enAyahs[idx]?.text ?? '',
    transliteration: trAyahs[idx]?.text ?? '',
  }));
}
