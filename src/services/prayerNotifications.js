import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { PRAYER_DEFINITIONS } from '../constants/data';
import { timingToLocalDate } from '../utils/prayerTimes';

/** Bundled file registered via `expo-notifications` plugin in app.json */
const IOS_ADHAN_SOUND = 'adhan.wav';

const SETTINGS_KEY = '@namaz_mentor_prayer_notify_settings_v1';
const TIMINGS_CACHE_KEY = '@namaz_mentor_prayer_timings_cache_v1';

export const ANDROID_CHANNEL_ADHAN = 'prayer-adhan';
export const ANDROID_CHANNEL_SILENT = 'prayer-silent';

function buildDefaultSettingsMap() {
  return Object.fromEntries(
    PRAYER_DEFINITIONS.map((d) => [d.id, { enabled: true, soundMode: 'azaan' }])
  );
}

function mergeSettings(stored) {
  const defaults = buildDefaultSettingsMap();
  const out = { ...defaults };
  if (!stored || typeof stored !== 'object') return out;
  for (const id of Object.keys(defaults)) {
    const row = stored[id];
    if (row && typeof row === 'object') {
      const rawMode = row.soundMode;
      const soundMode =
        rawMode === 'silent'
          ? 'silent'
          : rawMode === 'azaan' || rawMode === 'default'
            ? 'azaan'
            : defaults[id].soundMode;
      out[id] = {
        enabled: typeof row.enabled === 'boolean' ? row.enabled : defaults[id].enabled,
        soundMode,
      };
    }
  }
  return out;
}

export function configurePrayerNotificationHandler() {
  if (Platform.OS === 'web') return;
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      const mode = notification.request.content.data?.soundMode;
      const silent = mode === 'silent';
      return {
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: !silent,
        shouldSetBadge: false,
      };
    },
  });
}

export async function ensureAndroidChannels() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ADHAN, {
    name: 'Prayer (Adhan)',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    // Android raw resource name is typically the filename without extension.
    sound: 'adhan',
  });
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_SILENT, {
    name: 'Prayer (Silent)',
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: null,
    playSound: false,
    vibrationPattern: [0, 200],
  });
}

/** True when notification is on and Azaan (sound) mode — for home list speaker icon. */
export function isPrayerAdhanSoundOn(settings, prayerId) {
  const c = settings?.[prayerId];
  return Boolean(c?.enabled && c?.soundMode === 'azaan');
}

export async function loadPrayerNotificationSettings() {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return buildDefaultSettingsMap();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return buildDefaultSettingsMap();
    return mergeSettings(parsed);
  } catch {
    return buildDefaultSettingsMap();
  }
}

export async function savePrayerNotificationSettings(all) {
  const payload = JSON.stringify(all);
  await AsyncStorage.setItem(SETTINGS_KEY, payload);
}

export async function updatePrayerNotificationSetting(prayerId, partial) {
  const all = await loadPrayerNotificationSettings();
  const prev = all[prayerId] || buildDefaultSettingsMap()[prayerId];
  const updated = { ...prev, ...partial };
  const nextAll = { ...all, [prayerId]: updated };
  await savePrayerNotificationSettings(nextAll);
  return nextAll;
}

export async function cachePrayerTimingsForNotifications(prayers) {
  const slim = prayers.map((p) => ({ id: p.id, name: p.name, rawTime: p.rawTime }));
  await AsyncStorage.setItem(TIMINGS_CACHE_KEY, JSON.stringify(slim));
}

async function loadCachedPrayerTimings() {
  try {
    const raw = await AsyncStorage.getItem(TIMINGS_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function requestNotificationPermissions() {
  if (Platform.OS === 'web') return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

function nextPrayerDateFromRaw(rawTime) {
  const today = timingToLocalDate(rawTime, 0);
  if (today.getTime() > Date.now()) return today;
  return timingToLocalDate(rawTime, 1);
}

function notificationIdForPrayer(prayerId) {
  return `namaz-prayer-${prayerId}`;
}

/**
 * Schedules next occurrence per prayer from `prayers` (or last cached timings).
 * Uses stable identifiers so repeats replace prior requests.
 */
export async function reschedulePrayerNotifications(prayers) {
  if (Platform.OS === 'web') return;
  await ensureAndroidChannels();

  const settings = await loadPrayerNotificationSettings();
  const rows = prayers?.length ? prayers : await loadCachedPrayerTimings();
  if (!rows?.length) return;

  if (prayers?.length) {
    await cachePrayerTimingsForNotifications(prayers);
  }

  const { status } = await Notifications.getPermissionsAsync();
  for (const p of rows) {
    const nid = notificationIdForPrayer(p.id);
    await Notifications.cancelScheduledNotificationAsync(nid).catch(() => {});
  }

  if (status !== 'granted') return;

  for (const p of rows) {
    const conf = settings[p.id];
    if (!conf?.enabled) continue;

    const when = nextPrayerDateFromRaw(p.rawTime);
    if (when.getTime() <= Date.now()) continue;

    const isSilent = conf.soundMode === 'silent';

    const androidChannelId =
      Platform.OS === 'android'
        ? isSilent
          ? ANDROID_CHANNEL_SILENT
          : ANDROID_CHANNEL_ADHAN
        : undefined;

    await Notifications.scheduleNotificationAsync({
      identifier: notificationIdForPrayer(p.id),
      content: {
        title: `${p.name} — prayer time`,
        body: `It is time for ${p.name}. May Allah accept your salah.`,
        sound: isSilent ? false : IOS_ADHAN_SOUND,
        data: { prayerId: p.id, soundMode: isSilent ? 'silent' : 'azaan' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: when,
        ...(androidChannelId ? { channelId: androidChannelId } : {}),
      },
    });
  }
}
