import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@NamazMentor/quranContinue';

/**
 * @typedef {{ surahNumber: number, ayahNumber: number }} QuranProgress
 */

/**
 * @returns {Promise<QuranProgress | null>}
 */
export async function getQuranProgress() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const surahNumber = Number(parsed?.surahNumber);
    const ayahNumber = Number(parsed?.ayahNumber);
    if (!Number.isFinite(surahNumber) || !Number.isFinite(ayahNumber)) return null;
    return { surahNumber, ayahNumber };
  } catch {
    return null;
  }
}

/**
 * @param {QuranProgress} progress
 */
export async function saveQuranProgress(progress) {
  const payload = JSON.stringify({
    surahNumber: progress.surahNumber,
    ayahNumber: progress.ayahNumber,
  });
  await AsyncStorage.setItem(STORAGE_KEY, payload);
}
