import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { SURAHS as FALLBACK_SURAHS } from '../constants/data';
import { JUZ_FIRST_SURAH_NUMBER } from '../constants/quranJuz';
import { fetchAllSurahs } from '../services/quranApi';
import { getQuranProgress } from '../utils/quranProgress';
import MainTabBar from '../components/MainTabBar';
import { TabQuranIcon } from '../components/MainTabIcons';

export default function QuranScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('surah');
  const [search, setSearch] = useState('');
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const isSmall = width < 340;
  const androidTopInset = Platform.OS === 'android' ? Math.max(StatusBar.currentHeight || 0, 0) : 0;

  const loadSurahs = useCallback(async () => {
    setError(null);
    try {
      const list = await fetchAllSurahs();
      setSurahs(list);
    } catch (e) {
      setError(e?.message || 'Something went wrong');
      setSurahs((prev) => (prev.length > 0 ? prev : FALLBACK_SURAHS));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadSurahs();
  }, [loadSurahs]);

  const reloadProgress = useCallback(async () => {
    const p = await getQuranProgress();
    setProgress(p);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reloadProgress();
    }, [reloadProgress])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadSurahs();
  }, [loadSurahs]);

  const continueMeta = useMemo(() => {
    if (!progress || surahs.length === 0) return null;
    const surah = surahs.find((s) => s.id === progress.surahNumber);
    if (!surah) return null;
    const ayah = Math.min(Math.max(1, progress.ayahNumber), surah.ayahs);
    const pct = surah.ayahs > 0 ? (ayah / surah.ayahs) * 100 : 0;
    return { surah, ayah, pct };
  }, [progress, surahs]);

  const filteredSurahs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return surahs;
    return surahs.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.translation.toLowerCase().includes(q) ||
        String(s.id).includes(q)
    );
  }, [surahs, search]);

  const juzRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return JUZ_FIRST_SURAH_NUMBER.map((startSurahId, index) => {
      const juzNum = index + 1;
      const startSurah = surahs.find((s) => s.id === startSurahId);
      const subtitle = startSurah
        ? `Starts at ${startSurah.name}`
        : `Surah ${startSurahId}`;
      return { juzNum, startSurahId, startSurah, subtitle };
    }).filter((row) => {
      if (!q) return true;
      if (`juz ${row.juzNum}`.includes(q)) return true;
      if (String(row.juzNum).includes(q)) return true;
      if (row.startSurah?.name?.toLowerCase().includes(q)) return true;
      if (row.startSurah?.translation?.toLowerCase().includes(q)) return true;
      return false;
    });
  }, [surahs, search]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={[styles.safeArea, {   paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 0, }]}>
        {/* {continueMeta ? (
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.continueCard, isCompact && styles.continueCardCompact]}
            onPress={() =>
              navigation?.navigate('QuranReader', {
                surah: {
                  id: continueMeta.surah.id,
                  name: continueMeta.surah.name,
                  translation: continueMeta.surah.translation,
                  ayahs: continueMeta.surah.ayahs,
                },
                initialAyah: continueMeta.ayah,
              })
            }
          >
            <View style={styles.continueTopRow}>
              <View style={styles.continueLeft}>
                <View style={styles.continueIconWrap}>
                  <Ionicons name="book-outline" size={22} color={Colors.gold} />
                </View>
                <View style={styles.continueTextCol}>
                  <Text style={styles.continueTitle}>Continue Reading</Text>
                  <Text style={[styles.continueSurah, isSmall && styles.continueSurahSmall]} numberOfLines={1}>
                    Surah {continueMeta.surah.name}
                  </Text>
                  <Text style={styles.continueAyah}>
                    Ayah {continueMeta.ayah} of {continueMeta.surah.ayahs}
                  </Text>
                </View>
              </View>
              <View style={styles.continueChevron}>
                <Ionicons name="chevron-forward" size={22} color={Colors.textMuted} />
              </View>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${continueMeta.pct}%` }]} />
            </View>
          </TouchableOpacity>
        ) : null} */}

        {/* Search Bar */}
        <View style={[styles.searchBar, isCompact && styles.searchBarCompact]}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            placeholder="Search Surah..."
            placeholderTextColor={Colors.textMuted}
            style={[styles.searchInput, isCompact && styles.searchInputCompact]}
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        {/* Surah / Juz Tabs */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={() => setActiveTab('surah')}
            style={[
              styles.filterBtn,
              isCompact && styles.filterBtnCompact,
              activeTab === 'surah' && styles.filterBtnActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                isCompact && styles.filterTextCompact,
                activeTab === 'surah' && styles.filterTextActive,
              ]}
            >
              Surah
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('juz')}
            style={[
              styles.filterBtn,
              isCompact && styles.filterBtnCompact,
              activeTab === 'juz' && styles.filterBtnActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                isCompact && styles.filterTextCompact,
                activeTab === 'juz' && styles.filterTextActive,
              ]}
            >
              Juz
            </Text>
          </TouchableOpacity>
        </View>

        {error && surahs.length > 0 && surahs === FALLBACK_SURAHS && !loading ? (
          <View style={styles.bannerRow}>
            <Ionicons name="cloud-offline-outline" size={18} color={Colors.textMuted} />
            <Text style={styles.bannerText}>Showing offline list. </Text>
            <TouchableOpacity onPress={loadSurahs} hitSlop={8}>
              <Text style={styles.bannerLink}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {loading && surahs.length === 0 ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.gold} />
            <Text style={styles.loadingHint}>Loading surahs…</Text>
          </View>
        ) : null}

        {!loading && error && surahs.length === 0 ? (
          <View style={styles.centered}>
            <Ionicons name="alert-circle-outline" size={40} color={Colors.textMuted} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={loadSurahs}>
              <Text style={styles.retryBtnText}>Try again</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Lists */}
        {!loading || surahs.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.surahList, isCompact && styles.surahListCompact]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.gold}
                colors={[Colors.gold]}
              />
            }
          >
            {activeTab === 'surah'
              ? filteredSurahs.map((surah) => (
                  <TouchableOpacity
                    key={surah.id}
                    style={[styles.surahRow, isCompact && styles.surahRowCompact]}
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation?.navigate('QuranReader', {
                        surah: {
                          id: surah.id,
                          name: surah.name,
                          translation: surah.translation,
                          ayahs: surah.ayahs,
                        },
                      })
                    }
                  >
                    <View style={[styles.numberBadge, isCompact && styles.numberBadgeCompact]}>
                      <TabQuranIcon size={20} active={false} />
                    </View>
                    <View style={styles.surahInfo}>
                      <Text style={[styles.surahName, isCompact && styles.surahNameCompact]} numberOfLines={1}>
                        {surah.name}
                      </Text>
                      <Text style={styles.surahTranslation} numberOfLines={1}>
                        {surah.translation}
                      </Text>
                    </View>
                    <Text style={[styles.ayahCount, isCompact && styles.ayahCountCompact]} numberOfLines={1}>
                      {surah.ayahs} Ayahs
                    </Text>
                  </TouchableOpacity>
                ))
              : juzRows.map((row) => (
                  <TouchableOpacity
                    key={row.juzNum}
                    style={[styles.surahRow, isCompact && styles.surahRowCompact]}
                    activeOpacity={0.7}
                    onPress={() => {
                      const s =
                        row.startSurah ||
                        surahs.find((x) => x.id === row.startSurahId) || {
                          id: row.startSurahId,
                          name: `Surah ${row.startSurahId}`,
                          translation: '',
                        };
                      navigation?.navigate('QuranReader', {
                        surah: {
                          id: s.id,
                          name: s.name,
                          translation: s.translation,
                          ayahs: s.ayahs,
                        },
                      });
                    }}
                  >
                    <View style={[styles.numberBadge, isCompact && styles.numberBadgeCompact]}>
                      <Ionicons name="albums-outline" size={20} color={Colors.textMuted} />
                      <Text style={styles.surahNumber}>{row.juzNum}</Text>
                    </View>
                    <View style={styles.surahInfo}>
                      <Text style={[styles.surahName, isCompact && styles.surahNameCompact]} numberOfLines={1}>
                        Juz {row.juzNum}
                      </Text>
                      <Text style={styles.surahTranslation} numberOfLines={1}>
                        {row.subtitle}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                  </TouchableOpacity>
                ))}
          </ScrollView>
        ) : null}
      </SafeAreaView>

      <View style={styles.tabBarWrapper}>
        <MainTabBar activeTab="quran" navigation={navigation} />
      </View>
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
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },

  continueCard: {
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  continueCardCompact: {
    padding: Spacing.sm + 2,
  },
  continueTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.sm + 4,
  },
  continueIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm + 2,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueTextCol: { flex: 1 },
  continueTitle: {
    ...Fonts.medium,
    fontSize: 12,
    color: Colors.textGrey,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  continueSurah: {
    ...Fonts.bold,
    fontSize: 16,
    color: Colors.textWhite,
    marginTop: 4,
  },
  continueSurahSmall: {
    fontSize: 15,
  },
  continueAyah: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  continueChevron: {
    marginLeft: Spacing.sm,
  },
  progressBarBg: {
    marginTop: Spacing.md - 4,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: Colors.gold,
    borderRadius: 2,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundMedium,
    borderRadius: 50,
    height: 48,
    paddingHorizontal: Spacing.md - 2,
    paddingVertical: 12,
    gap: 10,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  searchBarCompact: {
    paddingVertical: 10,
    marginBottom: Spacing.sm + 6,
  },
  searchInput: {
    flex: 1,
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textWhite,
    paddingVertical: 0,
  },
  searchInputCompact: {
    fontSize: 16,
  },

  filterRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: Radius.round,
    backgroundColor: Colors.backgroundMedium,
  },
  filterBtnCompact: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  filterBtnActive: {
    backgroundColor: Colors.backgroundBlue,
  },
  filterText: {
    ...Fonts.medium,
    fontSize: 14,
    color: Colors.textMuted,
  },
  filterTextCompact: {
    fontSize: 13,
  },
  filterTextActive: {
    color: Colors.textWhite,
  },

  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: Spacing.sm,
    gap: 4,
  },
  bannerText: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
  },
  bannerLink: {
    ...Fonts.semiBold,
    fontSize: 13,
    color: Colors.gold,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  loadingHint: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  errorText: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textGrey,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.round,
    backgroundColor: Colors.backgroundBlue,
  },
  retryBtnText: {
    ...Fonts.semiBold,
    fontSize: 14,
    color: Colors.textWhite,
  },

  surahList: {
    gap: 12,
    paddingBottom: Spacing.md,
    flexGrow: 1,
  },
  surahListCompact: {
    paddingBottom: Spacing.lg,
  },
  surahRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.lg,
    gap: Spacing.sm ,
  },
  surahRowCompact: {
    paddingVertical: 12,
    paddingHorizontal:  12,
    gap: 16,
  },
  numberBadge: {
    width: 46,
    height: 46,
    backgroundColor: 'rgba(2, 18, 38, 1)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBadgeCompact: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  surahNumber: {
    position: 'absolute',
    bottom: 2,
    right: 4,
    ...Fonts.bold,
    fontSize: 9,
    color: Colors.gold,
  },
  surahInfo: { flex: 1 },
  surahName: {
    fontSize: 16,
    color: Colors.textWhite,
  },
  surahNameCompact: {
    fontSize: 16,
    fontWeight: '500',
  },
  surahTranslation: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  ayahCount: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    minWidth: 72,
    textAlign: 'right',
  },
  ayahCountCompact: {
    fontSize: 12,
    minWidth: 64,
  },

  tabBarWrapper: {
    backgroundColor: Colors.backgroundDark,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
});
