import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, Path, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { SURAHS } from '../constants/data';
import { fetchSurahAyahs, fetchSurahAudioUrls } from '../services/quranApi';
import { saveQuranProgress } from '../utils/quranProgress';

function AyahBadgeIcon({ size = 50 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        d="M37.8112 18.6236L33.1251 13.9374V7.30997C33.1251 6.72312 32.6493 6.24736 32.0625 6.24736H25.435L20.7489 1.56118C20.334 1.14627 19.6611 1.14627 19.2461 1.56118L14.5599 6.24736H7.93254C7.3457 6.24736 6.86993 6.72312 6.86993 7.30997V13.9374L2.18369 18.6236C1.7721 19.0193 1.7721 19.7307 2.18369 20.1264L6.86993 24.8125V31.44C6.86993 32.0268 7.3457 32.5026 7.93254 32.5026H14.5599L19.2461 37.1887C19.661 37.6038 20.3339 37.6037 20.7489 37.1887L25.4351 32.5026H32.0625C32.6493 32.5026 33.1251 32.0268 33.1251 31.44V24.8126L37.8112 20.1264C38.2263 19.7114 38.2263 19.0385 37.8112 18.6236ZM31.3111 23.6211C31.1119 23.8203 30.9999 24.0906 30.9999 24.3724V30.3773H24.995C24.7131 30.3773 24.4429 30.4892 24.2436 30.6886L19.9975 34.9347L15.7514 30.6886C15.5521 30.4893 15.2818 30.3773 15 30.3773H8.99515V24.3724C8.99515 24.0905 8.88315 23.8203 8.68387 23.6211L4.43783 19.375L8.68387 15.129C8.88315 14.9298 8.99515 14.6595 8.99515 14.3777V8.37272H15C15.2818 8.37272 15.5521 8.26079 15.7514 8.06144L19.9975 3.8154L24.2435 8.06144C24.4427 8.26072 24.713 8.37272 24.9948 8.37272H30.9998V14.3776C30.9998 14.6595 31.1117 14.9297 31.3111 15.1289L35.5571 19.375L31.3111 23.6211Z"
        fill="url(#ayahBadgeGradient)"
      />
      <Path
        d="M24.0366 17.4623C23.4498 17.4623 22.974 17.938 22.974 18.5249V22.8461C22.9205 24.2538 20.903 24.2533 20.8488 22.847V18.5249C20.7966 17.1165 18.7754 17.1175 18.7236 18.5249V22.8463V22.847C18.669 24.2544 16.6514 24.2527 16.5984 22.8461V18.5202C16.6033 17.6291 15.542 17.1297 14.8587 17.7012L12.0251 20.0436C11.6864 20.3236 11.1833 20.302 10.9266 19.9967L10.1859 19.116C9.80816 18.6668 9.138 18.609 8.68873 18.9867C8.2396 19.3645 8.18173 20.0348 8.55945 20.4839L9.30009 21.3646C10.3092 22.5646 12.1392 22.7069 13.3792 21.6816L14.4731 20.7773V22.8461C14.4513 25.5821 17.7916 27.0506 19.7862 25.22C21.7971 27.0488 25.1091 25.5904 25.0992 22.8461V18.5249C25.0992 17.938 24.6235 17.4623 24.0366 17.4623Z"
        fill="#D9AA55"
      />
      <Path
        d="M27.7887 14.4161C27.2018 14.4161 26.7261 14.8919 26.7261 15.4787V24.9713C26.7784 26.3797 28.7995 26.3787 28.8513 24.9713V15.4787C28.8513 14.8919 28.3756 14.4161 27.7887 14.4161Z"
        fill="#D9AA55"
      />
      <Path
        d="M15.4765 14.5671L16.4245 15.2565C17.3965 15.9635 18.7027 15.9634 19.6747 15.2565L19.9977 15.0216L20.3207 15.2565C21.2927 15.9634 22.5988 15.9635 23.571 15.2565L24.5189 14.5671C24.9936 14.2219 25.0986 13.5573 24.7534 13.0827C24.4083 12.6081 23.7437 12.5031 23.269 12.8483L22.321 13.5378C22.0862 13.7084 21.8058 13.7086 21.5708 13.5378L20.6227 12.8483C20.2502 12.5773 19.7454 12.5773 19.3727 12.8483L18.4247 13.5378C18.1898 13.7086 17.9094 13.7085 17.6745 13.5378L16.7265 12.8483C16.2519 12.5031 15.5873 12.608 15.2422 13.0827C14.897 13.5573 15.0019 14.2219 15.4765 14.5671Z"
        fill="#D9AA55"
      />
      <Path
        d="M20.069 11.5825C20.6558 11.5825 21.1316 11.1068 21.1316 10.5199V9.8115C21.0793 8.40312 19.0581 8.40418 19.0063 9.8115V10.5199C19.0063 11.1068 19.4821 11.5825 20.069 11.5825Z"
        fill="#D9AA55"
      />
      <Defs>
        <SvgLinearGradient id="ayahBadgeGradient" x1="20.0024" y1="1.25089" x2="20.0004" y2="37.5" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#D7AE63" />
          <Stop offset="0.278846" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </SvgLinearGradient>
      </Defs>
    </Svg>
  );
}

function BackArrowIcon({ size = 24, color = '#F5F7FA' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.9983 18.9974L4.99927 11.9984L11.9983 4.99931"
        stroke={color}
        strokeWidth={1.99973}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.9974 11.9984H4.99927"
        stroke={color}
        strokeWidth={1.99973}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function QuranReaderScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const surah = route?.params?.surah || { id: 1, name: 'Al-Fatihah', translation: 'The Opening' };
  const initialAyah = route?.params?.initialAyah;

  const meta = useMemo(() => SURAHS.find((s) => s.id === surah.id), [surah.id]);
  const [ayahs, setAyahs] = useState([]);
  const [textLoading, setTextLoading] = useState(true);
  const [textError, setTextError] = useState(null);

  const totalAyahs = ayahs.length > 0 ? ayahs.length : surah.ayahs ?? meta?.ayahs ?? 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioUrls, setAudioUrls] = useState([]);
  const [audioLoading, setAudioLoading] = useState(true);
  const [audioError, setAudioError] = useState(null);
  const soundRef = useRef(null);

  const progressPct = totalAyahs > 0 ? ((currentIndex + 1) / totalAyahs) * 100 : 0;
  const canPlayAudio = audioUrls.length > 0 && !audioLoading;

  useEffect(() => {
    if (ayahs.length === 0) return;
    if (initialAyah != null && initialAyah >= 1) {
      setCurrentIndex(Math.min(Math.max(0, initialAyah - 1), ayahs.length - 1));
    } else {
      setCurrentIndex(0);
    }
  }, [surah.id, initialAyah, ayahs.length]);

  useEffect(() => {
    let cancelled = false;
    setTextLoading(true);
    setTextError(null);
    setAyahs([]);
    setCurrentIndex(0);
    (async () => {
      try {
        const list = await fetchSurahAyahs(surah.id);
        if (!cancelled) setAyahs(list);
      } catch (e) {
        if (!cancelled) {
          setTextError(e?.message || 'Could not load ayahs');
          setAyahs([]);
        }
      } finally {
        if (!cancelled) setTextLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [surah.id]);

  useEffect(() => {
    if (ayahs.length === 0) return;
    saveQuranProgress({ surahNumber: surah.id, ayahNumber: currentIndex + 1 });
  }, [surah.id, currentIndex, ayahs.length]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setPlaying(false);
    let cancelled = false;
    setAudioLoading(true);
    setAudioError(null);
    setAudioUrls([]);
    (async () => {
      try {
        const urls = await fetchSurahAudioUrls(surah.id);
        if (!cancelled) setAudioUrls(urls);
      } catch (e) {
        if (!cancelled) {
          setAudioError(e?.message || 'Audio unavailable');
          setAudioUrls([]);
        }
      } finally {
        if (!cancelled) setAudioLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [surah.id]);

  const stopAndUnloadSound = useCallback(async () => {
    const s = soundRef.current;
    soundRef.current = null;
    if (!s) return;
    try {
      await s.stopAsync();
    } catch {}
    try {
      await s.unloadAsync();
    } catch {}
  }, []);

  const startPlaybackAt = useCallback(
    async (index) => {
      await stopAndUnloadSound();
      const idx = Math.min(Math.max(0, index), audioUrls.length - 1);
      const uri = audioUrls[idx];
      if (!uri) {
        setPlaying(false);
        return;
      }
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true },
          (status) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlaying(false);
            }
          }
        );
        soundRef.current = sound;
      } catch {
        setPlaying(false);
      }
    },
    [audioUrls, stopAndUnloadSound]
  );

  useEffect(() => {
    if (!playing) {
      stopAndUnloadSound();
      return;
    }
    startPlaybackAt(currentIndex);
  }, [playing, currentIndex, audioUrls, startPlaybackAt, stopAndUnloadSound]);

  useEffect(() => {
    return () => {
      stopAndUnloadSound();
    };
  }, [stopAndUnloadSound]);

  const goPrev = useCallback(() => {
    if (ayahs.length === 0) return;
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, [ayahs.length]);

  const goNext = useCallback(() => {
    if (ayahs.length === 0) return;
    setCurrentIndex((i) => Math.min(ayahs.length - 1, i + 1));
  }, [ayahs.length]);

  const togglePlay = useCallback(() => {
    if (!canPlayAudio) return;
    setPlaying((p) => !p);
  }, [canPlayAudio]);

  const playAyahAt = useCallback(
    (index) => {
      if (!canPlayAudio) return;
      setCurrentIndex(index);
      setPlaying(true);
    },
    [canPlayAudio]
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.headerIconBtn}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <BackArrowIcon size={24} color={Colors.textWhite} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.surahTitle} numberOfLines={1}>
              {surah.name}
            </Text>
            <Text style={styles.surahSubtitle} numberOfLines={2}>
              {surah.translation} · {totalAyahs || '…'} Ayahs
              {textLoading ? ' · Loading text…' : textError ? ` · ${textError}` : ''}
              {audioLoading ? ' · Loading audio…' : audioError ? ` · ${audioError}` : ''}
            </Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>

        <View style={styles.scrollArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
          {textLoading && ayahs.length === 0 ? (
            <View style={styles.textStateWrap}>
              <ActivityIndicator size="large" color={Colors.gold} />
              <Text style={styles.textStateHint}>Loading ayahs…</Text>
            </View>
          ) : null}
          {!textLoading && textError && ayahs.length === 0 ? (
            <View style={styles.textStateWrap}>
              <Text style={styles.textStateHint}>{textError}</Text>
            </View>
          ) : null}
          {ayahs.map((ayah, index) => {
            const isCurrent = index === currentIndex;
            const CardInner = (
              <View style={[styles.ayahCard, isCurrent && styles.ayahCardActive]}>
                <View style={styles.ayahHeader}>
                  <View style={styles.ayahNumberBadge}>
                    <AyahBadgeIcon size={40} />
                    {/* <Text style={styles.ayahNumberText}>{ayah.number}</Text> */}
                  </View>
                  <TouchableOpacity
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel={`Play ayah ${ayah.number}`}
                    onPress={() => playAyahAt(index)}
                    disabled={!canPlayAudio}
                  >
                  </TouchableOpacity>
                </View>
                <Text style={styles.arabicText}>{ayah.arabic}</Text>
                {ayah.transliteration ? (
                  <Text style={styles.transliterationText}>{ayah.transliteration}</Text>
                ) : null}
                <Text style={styles.translationText}>{ayah.translation}</Text>
              </View>
            );

            return (
              <TouchableOpacity
                key={ayah.number}
                activeOpacity={0.92}
                onPress={() => setCurrentIndex(index)}
              >
                {isCurrent ? (
                  <LinearGradient
                    colors={[Colors.goldStart, Colors.goldMid, Colors.goldEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.ayahCardBorder}
                  >
                    {CardInner}
                  </LinearGradient>
                ) : (
                  CardInner
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
          <View style={styles.bottomMeta}>
            <Text style={styles.bottomMetaLabel}>Ayah</Text>
            <Text style={styles.bottomMetaValue}>
              {ayahs.length > 0 ? ayahs[Math.min(currentIndex, ayahs.length - 1)]?.number ?? currentIndex + 1 : '—'}{' '}
              / {totalAyahs || '—'}
            </Text>
          </View>
          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={goPrev}
              disabled={currentIndex <= 0}
              accessibilityRole="button"
              accessibilityLabel="Previous ayah"
            >
              <Ionicons
                name="play-skip-back"
                size={22}
                color={currentIndex <= 0 ? Colors.dotInactiveDark : Colors.textMuted}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={togglePlay}
              accessibilityRole="button"
              accessibilityLabel={playing ? 'Pause' : 'Play'}
              disabled={!canPlayAudio}
            >
              <LinearGradient
                colors={
                  canPlayAudio
                    ? [Colors.goldStart, Colors.goldMid, Colors.goldEnd]
                    : [Colors.dotInactiveDark, Colors.dotInactiveDark, Colors.dotInactiveDark]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.playOuter}
              >
                <View style={styles.playInner}>
                  {audioLoading ? (
                    <ActivityIndicator color={Colors.textWhite} size="small" />
                  ) : (
                    <Ionicons
                      name={playing ? 'pause' : 'play'}
                      size={26}
                      color={Colors.textWhite}
                      style={playing ? undefined : { marginLeft: 3 }}
                    />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={goNext}
              disabled={currentIndex >= ayahs.length - 1}
              accessibilityRole="button"
              accessibilityLabel="Next ayah"
            >
              <Ionicons
                name="play-skip-forward"
                size={22}
                color={currentIndex >= ayahs.length - 1 ? Colors.dotInactiveDark : Colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  safeArea: {
    flex: 1,
    minHeight: 0,
  },
  scrollArea: {
    flex: 1,
    minHeight: 0,
  },
  scrollView: {
    flex: 1,
    minHeight: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
  },
  surahTitle: {
    ...Fonts.bold,
    fontSize: 18,
    color: 'rgba(255, 243, 223, 1)',
  },
  surahSubtitle: {
    ...Fonts.regular,
    fontSize: 13,
    color: 'rgba(166, 150, 119, 1)',
    marginTop: 2,
  },

  progressTrack: {
    marginHorizontal: Spacing.md,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.gold,
    borderRadius: 2,
  },

  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    gap: 16,
    paddingBottom: Spacing.lg,
    flexGrow: 1,
  },
  textStateWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg * 2,
    gap: Spacing.md,
  },
  textStateHint: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },

  ayahCardBorder: {
    borderRadius: Radius.md + 2,
    padding: 2,
  },
  ayahCard: {
    backgroundColor: 'rgba(6, 24, 47, 1)',
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm + 6,
  },
  ayahCardActive: {
    backgroundColor: 'rgba(6, 24, 47, 1)',
  },
  ayahHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ayahNumberBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ayahNumberText: {
    position: 'absolute',
    bottom: 3,
    right: 4,
    ...Fonts.bold,
    fontSize: 9,
    color: Colors.gold,
  },

  arabicText: {
    ...Fonts.regular,
    fontSize: 24,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'right',
    lineHeight: 48,
    letterSpacing: 0.5,
  },
  transliterationText: {
    ...Fonts.regular,
    fontSize: 13,
    fontStyle: 'italic',
    color: Colors.textMuted,
    lineHeight: 20,
  },
  translationText: {
    ...Fonts.regular,
    fontSize: 16,
    color: 'rgba(166, 150, 119, 1)',
    lineHeight: 26,
  },

  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.backgroundDark,
  },
  bottomMeta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  bottomMetaLabel: {
    ...Fonts.medium,
    fontSize: 12,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  bottomMetaValue: {
    ...Fonts.semiBold,
    fontSize: 14,
    color: Colors.textWhite,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg + 8,
  },
  controlBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playOuter: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.backgroundBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
