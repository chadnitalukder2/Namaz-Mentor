import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { SURAHS } from '../constants/data';

export default function QuranScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('surah');
  const [search, setSearch] = useState('');

  const filtered = SURAHS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.translation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={styles.safeArea}>
        {/* Continue Reading Banner */}
        <View style={styles.continueCard}>
          <View style={styles.continueLeft}>
            <Text style={styles.continueIcon}>📖</Text>
            <View>
              <Text style={styles.continueTitle}>Continue Reading</Text>
              <Text style={styles.continueSurah}>Surah Al-Kahf</Text>
              <Text style={styles.continueAyah}>Ayah 45 of 110</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.continueArrow}
            onPress={() => navigation?.navigate('QuranReader', { surah: { id: 18, name: 'Al-Kahf' } })}
          >
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '41%' }]} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search Surah..."
            placeholderTextColor={Colors.textMuted}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Surah / Juz Tabs */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={() => setActiveTab('surah')}
            style={[styles.filterBtn, activeTab === 'surah' && styles.filterBtnActive]}
          >
            <Text style={[styles.filterText, activeTab === 'surah' && styles.filterTextActive]}>
              Surah
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('juz')}
            style={[styles.filterBtn, activeTab === 'juz' && styles.filterBtnActive]}
          >
            <Text style={[styles.filterText, activeTab === 'juz' && styles.filterTextActive]}>
              Juz
            </Text>
          </TouchableOpacity>
        </View>

        {/* Surah List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.surahList}
        >
          {filtered.map((surah) => (
            <TouchableOpacity
              key={surah.id}
              style={styles.surahRow}
              activeOpacity={0.7}
              onPress={() => navigation?.navigate('QuranReader', { surah })}
            >
              {/* Number badge */}
              <View style={styles.numberBadge}>
                <Text style={styles.numberIcon}>📖</Text>
                <Text style={styles.surahNumber}>{surah.id}</Text>
              </View>
              {/* Name */}
              <View style={styles.surahInfo}>
                <Text style={styles.surahName}>{surah.name}</Text>
                <Text style={styles.surahTranslation}>{surah.translation}</Text>
              </View>
              {/* Ayahs count */}
              <Text style={styles.ayahCount}>{surah.ayahs} Ayahs</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* Tab Bar */}
      <View style={styles.tabBarWrapper}>
        <QuranTabBar navigation={navigation} />
      </View>
    </View>
  );
}

function QuranTabBar({ navigation }) {
  const tabs = [
    { id: 'home', icon: '🏠', screen: 'Home' },
    { id: 'quran', icon: '📖', screen: 'Quran', label: 'Quran' },
    { id: 'qibla', icon: '🧭', screen: 'Qibla' },
    { id: 'dhikr', icon: '🔮', screen: 'Dhikr' },
  ];

  return (
    <View style={tabStyles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => navigation?.navigate(tab.screen)}
          style={[
            tabStyles.tabItem,
            tab.id === 'quran' && tabStyles.tabItemActive,
          ]}
          activeOpacity={0.8}
        >
          <Text style={tabStyles.tabIcon}>{tab.icon}</Text>
          {tab.id === 'quran' && (
            <Text style={tabStyles.tabLabel}>{tab.label}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const tabStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundBlue,
    borderRadius: 51,
    paddingHorizontal: 4,
    paddingVertical: 4,
    alignItems: 'center',
    gap: 4,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  tabItem: {
    flex: 1,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
    flexDirection: 'row',
    gap: 8,
  },
  tabItemActive: {
    backgroundColor: Colors.backgroundDark,
    flex: 1.8,
  },
  tabIcon: { fontSize: 18 },
  tabLabel: {
    ...Fonts.medium,
    fontSize: 12,
    color: Colors.textWhite,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // Continue Reading
  continueCard: {
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  continueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  continueIcon: { fontSize: 20 },
  continueTitle: {
    ...Fonts.medium,
    fontSize: 13,
    color: Colors.textGrey,
  },
  continueSurah: {
    ...Fonts.bold,
    fontSize: 16,
    color: Colors.textWhite,
  },
  continueAyah: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
  },
  continueArrow: {
    position: 'absolute',
    right: 16,
    top: '50%',
  },
  arrowIcon: {
    fontSize: 24,
    color: Colors.textMuted,
  },
  progressBarBg: {
    marginTop: 12,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
  },
  progressBarFill: {
    height: 4,
    backgroundColor: Colors.gold,
    borderRadius: 2,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    marginBottom: 16,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textWhite,
  },

  // Filter tabs
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: Radius.round,
    backgroundColor: Colors.backgroundMedium,
  },
  filterBtnActive: {
    backgroundColor: Colors.backgroundBlue,
  },
  filterText: {
    ...Fonts.medium,
    fontSize: 14,
    color: Colors.textMuted,
  },
  filterTextActive: {
    color: Colors.textWhite,
  },

  // Surah list
  surahList: {
    gap: 2,
    paddingBottom: 16,
  },
  surahRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    gap: 12,
  },
  numberBadge: {
    width: 46,
    height: 46,
    backgroundColor: Colors.backgroundMedium,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  numberIcon: { fontSize: 20 },
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
    ...Fonts.bold,
    fontSize: 16,
    color: Colors.textWhite,
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
  },
});
