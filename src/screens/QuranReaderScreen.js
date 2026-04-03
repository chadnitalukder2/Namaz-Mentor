import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { AL_FATIHAH_AYAHS } from '../constants/data';

export default function QuranReaderScreen({ navigation, route }) {
  const surah = route?.params?.surah || { id: 1, name: 'Al-Fatihah', translation: 'The Opening' };
  const ayahs = surah.id === 1 ? AL_FATIHAH_AYAHS : AL_FATIHAH_AYAHS; // default to Al-Fatihah

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.surahTitle}>{surah.name}</Text>
            <Text style={styles.surahSubtitle}>{surah.translation}</Text>
          </View>
          <TouchableOpacity style={styles.bookmarkBtn}>
            <Text style={styles.bookmarkIcon}>🔖</Text>
          </TouchableOpacity>
        </View>

        {/* Ayahs */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {ayahs.map((ayah) => (
            <View key={ayah.number} style={styles.ayahCard}>
              {/* Ayah number badge */}
              <View style={styles.ayahHeader}>
                <View style={styles.ayahNumberBadge}>
                  <Text style={styles.ayahNumberBadgeIcon}>📖</Text>
                  <Text style={styles.ayahNumberText}>{ayah.number}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.audioIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              {/* Arabic Text */}
              <Text style={styles.arabicText}>{ayah.arabic}</Text>

              {/* Translation */}
              <Text style={styles.translationText}>{ayah.translation}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Bottom controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.controlBtn}>
            <Text style={styles.controlIcon}>⏮</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtnLarge}>
            <Text style={styles.controlIconLarge}>▶</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn}>
            <Text style={styles.controlIcon}>⏭</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: Colors.textWhite,
    lineHeight: 32,
    marginTop: -6,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  surahTitle: {
    ...Fonts.bold,
    fontSize: 20,
    color: Colors.textWhite,
  },
  surahSubtitle: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  bookmarkBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkIcon: { fontSize: 18 },

  scrollContent: {
    padding: 20,
    gap: 12,
    paddingBottom: 20,
  },

  ayahCard: {
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    padding: 16,
    gap: 12,
  },
  ayahHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ayahNumberBadge: {
    width: 40,
    height: 40,
    backgroundColor: Colors.backgroundDark,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ayahNumberBadgeIcon: { fontSize: 18 },
  ayahNumberText: {
    position: 'absolute',
    bottom: 2,
    right: 3,
    ...Fonts.bold,
    fontSize: 9,
    color: Colors.gold,
  },
  audioIcon: { fontSize: 18 },

  arabicText: {
    ...Fonts.regular,
    fontSize: 22,
    color: Colors.textWhite,
    textAlign: 'right',
    lineHeight: 40,
    fontFamily: 'System', // Should be an Arabic font in production
    letterSpacing: 0.5,
  },
  translationText: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textGrey,
    lineHeight: 22,
  },

  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
  },
  controlBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIcon: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  controlBtnLarge: {
    width: 52,
    height: 52,
    backgroundColor: Colors.backgroundBlue,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIconLarge: {
    fontSize: 22,
    color: Colors.textWhite,
  },
});
