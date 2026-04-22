import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { SURAHS } from '../constants/data';
import { fetchSurahAyahs, fetchSurahAudioUrls } from '../services/quranApi';
import { saveQuranProgress } from '../utils/quranProgress';

export default function QuranReaderScreen({ navigation, route }) {
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

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.headerIconBtn}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={26} color={Colors.textWhite} />
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
          <TouchableOpacity
            style={styles.headerIconBtn}
            accessibilityRole="button"
            accessibilityLabel="Bookmark"
          >
            <Ionicons name="bookmark-outline" size={22} color={Colors.gold} />
          </TouchableOpacity>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>

        <ScrollView
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
              <Ionicons name="alert-circle-outline" size={40} color={Colors.textMuted} />
              <Text style={styles.textStateHint}>{textError}</Text>
            </View>
          ) : null}
          {ayahs.map((ayah, index) => {
            const isCurrent = index === currentIndex;
            const CardInner = (
              <View style={[styles.ayahCard, isCurrent && styles.ayahCardActive]}>
                <View style={styles.ayahHeader}>
                  <View style={styles.ayahNumberBadge}>
                    <Ionicons name="book-outline" size={20} color={Colors.textMuted} />
                    <Text style={styles.ayahNumberText}>{ayah.number}</Text>
                  </View>
                  <TouchableOpacity
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel={`Play ayah ${ayah.number}`}
                    onPress={() => playAyahAt(index)}
                    disabled={!canPlayAudio}
                  >
                    <Ionicons
                      name="volume-medium-outline"
                      size={22}
                      color={!canPlayAudio ? Colors.dotInactiveDark : Colors.textGrey}
                    />
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

        <View style={styles.bottomBar}>
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
    color: Colors.textWhite,
  },
  surahSubtitle: {
    ...Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },

  progressTrack: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
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
    gap: Spacing.sm + 4,
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
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm + 4,
  },
  ayahCardActive: {
    backgroundColor: Colors.backgroundCard,
  },
  ayahHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ayahNumberBadge: {
    width: 44,
    height: 44,
    backgroundColor: Colors.backgroundDark,
    borderRadius: Radius.sm + 2,
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
    fontSize: 23,
    color: Colors.textWarmCream,
    textAlign: 'right',
    lineHeight: 40,
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
    fontSize: 14,
    color: Colors.textGrey,
    lineHeight: 22,
  },

  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
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
