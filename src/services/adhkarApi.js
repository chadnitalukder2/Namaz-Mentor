const HISN_EN_BASE = 'https://www.hisnmuslim.com/api/en';

/**
 * Strip simple Markdown-style links: [label](url) -> label
 * @param {string} s
 */
function stripMarkdownLinks(s) {
  if (!s) return '';
  return String(s).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
}

/**
 * Short label for card header from Hisn fields.
 * @param {object} row
 */
function pickTitle(row) {
  const lang = row.LANGUAGE_ARABIC_TRANSLATED_TEXT;
  if (lang && String(lang).trim()) {
    const oneLine = String(lang).replace(/\s+/g, ' ').trim();
    return oneLine.length > 140 ? `${oneLine.slice(0, 137)}…` : oneLine;
  }
  const t = row.TRANSLATED_TEXT;
  if (t && String(t).trim()) {
    const oneLine = stripMarkdownLinks(String(t)).replace(/\s+/g, ' ').trim();
    return oneLine.length > 100 ? `${oneLine.slice(0, 97)}…` : oneLine;
  }
  return `Remembrance #${row.ID ?? ''}`;
}

/**
 * Use LANGUAGE line as transliteration when it looks like Latin-heavy guidance.
 * @param {string} s
 */
function looksLikeTransliterationLine(s) {
  if (!s || s.length < 8) return false;
  const letters = s.replace(/[^a-zA-Z]/g, '');
  return letters.length >= s.length * 0.25;
}

/**
 * @param {object} row Hisn Muslim JSON row
 * @param {number} index fallback index
 * @returns {{ id: number, title: string, reference: string, arabic: string, transliteration: string, translation: string, target: number }}
 */
export function normalizeHisnRow(row, index) {
  const id = Number(row.ID) || index + 1;
  const arabic = String(row.ARABIC_TEXT ?? '').trim();
  const translation = stripMarkdownLinks(String(row.TRANSLATED_TEXT ?? '')).trim();
  const langLine = String(row.LANGUAGE_ARABIC_TRANSLATED_TEXT ?? '').trim();
  const title = pickTitle(row);
  const transliteration =
    langLine && langLine !== title && looksLikeTransliterationLine(langLine) ? langLine : '';

  const target = Math.max(1, Math.min(1000, Number(row.REPEAT) || 1));

  return {
    id,
    title,
    reference: '',
    arabic,
    transliteration,
    translation,
    target,
  };
}

/**
 * Parse Hisn Muslim chapter JSON (single top-level key -> array).
 * @param {object} json
 * @returns {{ chapterTitle: string, items: ReturnType<typeof normalizeHisnRow>[] }}
 */
export function parseHisnChapterJson(json) {
  if (!json || typeof json !== 'object') {
    return { chapterTitle: '', items: [] };
  }
  const keys = Object.keys(json);
  if (!keys.length) return { chapterTitle: '', items: [] };
  const chapterTitle = keys[0];
  const raw = json[chapterTitle];
  if (!Array.isArray(raw)) return { chapterTitle, items: [] };
  const items = raw.map((row, idx) => normalizeHisnRow(row, idx));
  return { chapterTitle, items };
}

/**
 * Fetch one English Hisn al-Muslim chapter by numeric id (e.g. 27 morning/evening, 25 after prayer, 28 before sleep).
 * @param {number} chapterId
 * @returns {Promise<{ chapterTitle: string, items: ReturnType<typeof normalizeHisnRow>[] }>}
 */
export async function fetchHisnEnglishChapter(chapterId) {
  const url = `${HISN_EN_BASE}/${chapterId}.json`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'NamazMentor/1.0 (Hisn al-Muslim reader)',
    },
  });
  const text = await res.text().catch(() => '');
  if (!res.ok) {
    throw new Error(res.statusText || `HTTP ${res.status}`);
  }
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON from adhkar source');
  }
  return parseHisnChapterJson(json);
}

/**
 * Item count for a chapter (for library list). Fails soft: returns null.
 * @param {number} chapterId
 * @returns {Promise<number | null>}
 */
export async function fetchHisnChapterItemCount(chapterId) {
  try {
    const { items } = await fetchHisnEnglishChapter(chapterId);
    return items.length;
  } catch {
    return null;
  }
}
