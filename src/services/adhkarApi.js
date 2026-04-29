const HISN_EN_BASES = ['https://www.hisnmuslim.com/api/en', 'https://hisnmuslim.com/api/en'];
const FETCH_TIMEOUT_MS = 12000;
const MUSLIM_KIT_BASE = 'https://ahegazy.github.io/muslimKit/json';

const MUSLIM_KIT_BY_CATEGORY_ID = {
  morning: 'azkar_sabah.json',
  evening: 'azkar_massa.json',
  'after-salah': 'PostPrayer_azkar.json',
};

/** rn0x/Adhkar-json — full Hisn-style categories; id 2 = أذكار النوم (before sleep). */
const RN0X_ADHKAR_JSON =
  'https://raw.githubusercontent.com/rn0x/Adhkar-json/main/adhkar.json';

/** Seen-Arabic DB — English translation + transliteration for morning/evening. */
const SEEN_ARABIC_EN_URL =
  'https://raw.githubusercontent.com/Seen-Arabic/Morning-And-Evening-Adhkar-DB/main/en.json';

/** @type {any[] | null} */
let rn0xAdhkarCache = null;

/** @type {any[] | null} */
let seenArabicEnCache = null;

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

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

/** Heuristic: Latin letters dominate → treat as English (e.g. muslimKit `bless` sometimes English). */
function looksMostlyEnglish(s) {
  if (!s || s.length < 12) return false;
  const letters = s.replace(/[^a-zA-Z]/g, '');
  return letters.length >= s.length * 0.28;
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
 * @param {object} row muslimKit row
 * @param {number} index fallback index
 * @returns {{ id: number, title: string, reference: string, arabic: string, transliteration: string, translation: string, target: number }}
 */
function normalizeMuslimKitRow(row, index) {
  const arabic = String(row?.zekr ?? '').trim();
  const bless = String(row?.bless ?? '').trim();
  const target = Math.max(1, Math.min(1000, Number(row?.repeat) || 1));
  const reference = bless && !looksMostlyEnglish(bless) ? bless : '';
  const translation = looksMostlyEnglish(bless)
    ? bless
    : 'English meaning is not included in this offline bundle. Use the Arabic text above, or go online to load full English from Hisn al-Muslim.';
  return {
    id: index + 1,
    title: `Dhikr ${index + 1}`,
    reference,
    arabic,
    transliteration: '',
    translation,
    target,
  };
}

/**
 * Fallback source (muslimKit) for category-wise adhkar.
 * @param {string} categoryId
 * @returns {Promise<{ chapterTitle: string, items: ReturnType<typeof normalizeMuslimKitRow>[] }>}
 */
async function fetchMuslimKitCategory(categoryId) {
  const filename = MUSLIM_KIT_BY_CATEGORY_ID[categoryId];
  if (!filename) {
    throw new Error('No fallback source for this category');
  }
  const url = `${MUSLIM_KIT_BASE}/${filename}`;
  const res = await fetchWithTimeout(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText || `HTTP ${res.status}`);
  }
  const json = await res.json();
  const rawItems = Array.isArray(json?.content) ? json.content : [];
  return {
    chapterTitle: String(json?.title ?? '').trim(),
    items: rawItems.map((row, idx) => normalizeMuslimKitRow(row, idx)),
  };
}

/**
 * @param {object} row rn0x `array` item
 * @param {number} index
 * @returns {{ id: number, title: string, reference: string, arabic: string, transliteration: string, translation: string, target: number }}
 */
function normalizeRn0xRow(row, index) {
  const arabic = String(row?.text ?? '').trim();
  const id = Number(row?.id) || index + 1;
  const target = Math.max(1, Math.min(1000, Number(row?.count) || 1));
  return {
    id,
    title: `Dhikr ${id}`,
    reference: '',
    arabic,
    transliteration: '',
    translation:
      'This backup source lists Arabic only (Hisn al-Muslim). English meaning appears when the main Hisn English feed loads successfully.',
    target,
  };
}

async function getSeenArabicEnArray() {
  if (seenArabicEnCache) return seenArabicEnCache;
  const res = await fetchWithTimeout(SEEN_ARABIC_EN_URL, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(res.statusText || `HTTP ${res.status}`);
  }
  const json = await res.json();
  if (!Array.isArray(json)) {
    throw new Error('Invalid Seen-Arabic en.json');
  }
  seenArabicEnCache = json;
  return seenArabicEnCache;
}

/**
 * @param {object} row Seen-Arabic en.json row
 * @param {number} index
 */
function normalizeSeenArabicRow(row, index) {
  const id = Number(row?.order) || index + 1;
  const arabic = String(row?.content ?? '').trim();
  const translation = String(row?.translation ?? '').trim();
  const transliteration = String(row?.transliteration ?? '').trim();
  const source = String(row?.source ?? '').trim();
  const fadl = String(row?.fadl ?? '').trim();
  const target = Math.max(1, Math.min(1000, Number(row?.count) || 1));

  let translationBody = translation;
  if (fadl && translation && !translation.includes(fadl.slice(0, Math.min(30, fadl.length)))) {
    translationBody = `${translation}\n\n${fadl}`;
  } else if (fadl && !translation) {
    translationBody = fadl;
  }

  const title = source || (translation ? `${translation.slice(0, 72)}${translation.length > 72 ? '…' : ''}` : `Dhikr ${id}`);

  return {
    id,
    title,
    reference: source,
    arabic,
    transliteration,
    translation: translationBody,
    target,
  };
}

/**
 * Morning / evening English rows (`type`: 0 = both, 1 = morning, 2 = evening).
 * @param {'morning' | 'evening'} categoryId
 */
async function fetchSeenArabicMorningEvening(categoryId) {
  const data = await getSeenArabicEnArray();
  const filtered = data.filter((row) => {
    const t = Number(row?.type);
    if (categoryId === 'morning') return t === 0 || t === 1;
    if (categoryId === 'evening') return t === 0 || t === 2;
    return false;
  });
  filtered.sort((a, b) => Number(a.order) - Number(b.order));
  if (!filtered.length) {
    throw new Error('Seen-Arabic filter returned no rows');
  }
  return {
    chapterTitle: categoryId === 'morning' ? 'Morning adhkar' : 'Evening adhkar',
    items: filtered.map((row, idx) => normalizeSeenArabicRow(row, idx)),
  };
}

async function getRn0xAdhkarRootArray() {
  if (rn0xAdhkarCache) return rn0xAdhkarCache;
  const res = await fetchWithTimeout(RN0X_ADHKAR_JSON, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(res.statusText || `HTTP ${res.status}`);
  }
  const json = await res.json();
  if (!Array.isArray(json)) {
    throw new Error('Invalid rn0x adhkar payload');
  }
  rn0xAdhkarCache = json;
  return rn0xAdhkarCache;
}

/**
 * @param {number} rn0xCategoryId e.g. 2 = sleep adhkar
 */
async function fetchRn0xCategoryById(rn0xCategoryId) {
  const data = await getRn0xAdhkarRootArray();
  const cat = data.find((x) => Number(x?.id) === rn0xCategoryId);
  const rawItems = Array.isArray(cat?.array) ? cat.array : [];
  if (!rawItems.length) {
    throw new Error('rn0x category empty or missing');
  }
  return {
    chapterTitle: String(cat?.category ?? '').trim(),
    items: rawItems.map((row, idx) => normalizeRn0xRow(row, idx)),
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
  let lastError = null;

  for (const base of HISN_EN_BASES) {
    const url = `${base}/${chapterId}.json`;
    try {
      const res = await fetchWithTimeout(url, {
        headers: {
          Accept: 'application/json',
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
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Unable to load adhkar data');
}

/**
 * Stable category fetch:
 * 1) Hisn by chapter
 * 2) muslimKit fallback for supported categories
 * @param {{ id?: string, hisnEnChapterId?: number }} category
 * @returns {Promise<{ chapterTitle: string, items: ReturnType<typeof normalizeHisnRow>[] }>}
 */
export async function fetchAdhkarByCategory(category) {
  const chapterId = Number(category?.hisnEnChapterId);
  const categoryId = String(category?.id || '');

  if (Number.isFinite(chapterId)) {
    try {
      return await fetchHisnEnglishChapter(chapterId);
    } catch {
      // Try category-specific fallback below.
    }
  }

  if (categoryId === 'morning' || categoryId === 'evening') {
    try {
      return await fetchSeenArabicMorningEvening(categoryId);
    } catch {
      // muslimKit last resort (Arabic-only virtue text).
    }
  }

  if (categoryId === 'before-sleep') {
    return await fetchRn0xCategoryById(2);
  }

  return fetchMuslimKitCategory(categoryId);
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
