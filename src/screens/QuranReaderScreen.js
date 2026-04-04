import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { AL_FATIHAH_AYAHS, SURAHS } from '../constants/data';

export default function QuranReaderScreen({ navigation, route }) {
  const surah = route?.params?.surah || { id: 1, name: 'Al-Fatihah', translation: 'The Opening' };
  const ayahs = surah.id === 1 ? AL_FATIHAH_AYAHS : AL_FATIHAH_AYAHS;

  const meta = useMemo(() => SURAHS.find((s) => s.id === surah.id), [surah.id]);
  const totalAyahs = meta?.ayahs ?? ayahs.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const progressPct = totalAyahs > 0 ? ((currentIndex + 1) / totalAyahs) * 100 : 0;

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(ayahs.length - 1, i + 1));
  }, [ayahs.length]);

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

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
            <Text style={styles.surahSubtitle} numberOfLines={1}>
              {surah.translation} · {totalAyahs} Ayahs
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
                  >
                    <Ionicons name="volume-medium-outline" size={22} color={Colors.textGrey} />
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
              {ayahs[currentIndex]?.number ?? 1} / {totalAyahs}
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
            >
              <LinearGradient
                colors={[Colors.goldStart, Colors.goldMid, Colors.goldEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.playOuter}
              >
                <View style={styles.playInner}>
                  <Ionicons
                    name={playing ? 'pause' : 'play'}
                    size={26}
                    color={Colors.textWhite}
                    style={playing ? undefined : { marginLeft: 3 }}
                  />
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
