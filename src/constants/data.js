/** Maps app rows to AlAdhan `timings` keys */
export const PRAYER_DEFINITIONS = [
  { id: 'fajr', name: 'Fajr', icon: 'fajr', timingKey: 'Fajr' },
  { id: 'dhuhr', name: 'Dhuhr', icon: 'dhuhr', timingKey: 'Dhuhr' },
  { id: 'asr', name: 'Asr', icon: 'asr', timingKey: 'Asr' },
  { id: 'maghrib', name: 'Maghrib', icon: 'maghrib', timingKey: 'Maghrib' },
  { id: 'isha', name: 'Isha', icon: 'isha', timingKey: 'Isha' },
];

/** Used when location permission is denied or the API fails (~ Sylhet). */
export const FALLBACK_LOCATION = {
  name: 'Sylhet, Bangladesh',
  latitude: 24.8948,
  longitude: 91.869,
};

/**
 * Offline / error fallback (24h `rawTime` for countdown logic).
 * `completed` is ignored at runtime; recomputed from clock.
 */
export const FALLBACK_PRAYERS = [
  { id: 'fajr', name: 'Fajr', time: '5:24 AM', rawTime: '05:24', icon: 'fajr' },
  { id: 'dhuhr', name: 'Dhuhr', time: '12:45 PM', rawTime: '12:45', icon: 'dhuhr' },
  { id: 'asr', name: 'Asr', time: '3:05 PM', rawTime: '15:05', icon: 'asr' },
  { id: 'maghrib', name: 'Maghrib', time: '5:54 PM', rawTime: '17:54', icon: 'maghrib' },
  { id: 'isha', name: 'Isha', time: '7:30 PM', rawTime: '19:30', icon: 'isha' },
];

/** @deprecated Use FALLBACK_PRAYERS + computed completion */
export const PRAYERS = FALLBACK_PRAYERS.map((p) => ({
  ...p,
  completed: false,
}));

export const SURAHS = [
  { id: 1, name: 'Al-Fatihah', translation: 'The Opening', ayahs: 7 },
  { id: 2, name: 'Al-Baqarah', translation: 'The Cow', ayahs: 286 },
  { id: 3, name: "Ali 'Imran", translation: 'Family of Imran', ayahs: 200 },
  { id: 4, name: 'An-Nisa', translation: 'The Women', ayahs: 176 },
  { id: 5, name: "Al-Ma'idah", translation: 'The Table Spread', ayahs: 120 },
  { id: 6, name: "Al-An'am", translation: 'The Cattle', ayahs: 165 },
  { id: 7, name: 'Al-Araf', translation: 'The Heights', ayahs: 206 },
  { id: 8, name: 'Al-Anfal', translation: 'The Spoils of War', ayahs: 75 },
  { id: 9, name: 'At-Tawbah', translation: 'The Repentance', ayahs: 129 },
  { id: 10, name: 'Yunus', translation: 'Jonah', ayahs: 109 },
  { id: 18, name: 'Al-Kahf', translation: 'The Cave', ayahs: 110 },
  { id: 36, name: 'Ya-Sin', translation: 'Ya-Sin', ayahs: 83 },
  { id: 55, name: 'Ar-Rahman', translation: 'The Beneficent', ayahs: 78 },
  { id: 112, name: 'Al-Ikhlas', translation: 'The Sincerity', ayahs: 4 },
  { id: 113, name: 'Al-Falaq', translation: 'The Daybreak', ayahs: 5 },
  { id: 114, name: 'An-Nas', translation: 'Mankind', ayahs: 6 },
];

export const AL_FATIHAH_AYAHS = [
  {
    number: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: "Bismillahi r-rahmani r-rahim",
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
  },
  {
    number: 2,
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    transliteration: "Al-hamdu lillahi rabbi l-'alamin",
    translation: '[All] praise is [due] to Allah, Lord of the worlds -',
  },
  {
    number: 3,
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Ar-rahmani r-rahim',
    translation: 'The Entirely Merciful, the Especially Merciful,',
  },
  {
    number: 4,
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    transliteration: 'Maliki yawmi d-din',
    translation: 'Sovereign of the Day of Recompense.',
  },
  {
    number: 5,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    transliteration: "Iyyaka na'budu wa iyyaka nasta'in",
    translation: 'It is You we worship and You we ask for help.',
  },
  {
    number: 6,
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    transliteration: 'Ihdina s-sirata l-mustaqim',
    translation: 'Guide us to the straight path -',
  },
  {
    number: 7,
    arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: "Sirata lladhina an'amta 'alayhim ghayri l-maghdubi 'alayhim wa la d-dallin",
    translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
  },
];

export const DHIKR_CATEGORIES = [
  { id: 'morning', name: 'Morning Adhkar', count: 15, icon: 'sun' },
  { id: 'evening', name: 'Evening Adhkar', count: 12, icon: 'moon' },
  { id: 'after-salah', name: 'After Salah', count: 8, icon: 'dua' },
  { id: 'before-sleep', name: 'Before Sleep', count: 10, icon: 'sleep' },
];

export const MORNING_ADHKAR = [
  {
    id: 1,
    title: 'Ayat al-Kursi',
    reference: 'Quran 2:255',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
    target: 1,
    count: 0,
  },
  {
    id: 2,
    title: 'Surah Al-Ikhlas',
    reference: 'Quran 112:1-4',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    translation: 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."',
    target: 3,
    count: 0,
  },
  {
    id: 3,
    title: 'Morning Protection Dua',
    reference: '',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    transliteration: 'Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilayka n-nushur',
    translation: 'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.',
    target: 1,
    count: 0,
  },
  {
    id: 4,
    title: 'Seeking Forgiveness',
    reference: '',
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Rabbi ighfir li wa tub 'alayya innaka anta al-tawwabu r-rahim",
    translation: 'My Lord, forgive me and accept my repentance, for You are the Accepting of repentance, the Merciful.',
    target: 100,
    count: 0,
  },
];
