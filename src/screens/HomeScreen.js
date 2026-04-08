import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { PrayerCard } from '../components/UIComponents';
import LocationPinIllustration from '../components/LocationPinIllustration';
import SettingsGearIllustration from '../components/SettingsGearIllustration';
import MainTabBar from '../components/MainTabBar';
import { usePrayerTimes, useCountdownToDate } from '../hooks/usePrayerData';

const TOP_SECTION_PADDING = 16; 

export default function HomeScreen({ navigation }) {
  const { prayers, nextPrayer, nextPrayerAt, locationLabel, loading } = usePrayerTimes();
  const countdown = useCountdownToDate(nextPrayerAt);
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const locationMaxWidth = Math.max(130, width - 170);
  const androidTopInset =
    Platform.OS === 'android' ? Math.max(StatusBar.currentHeight || 0, 24) : 0;
  const countdownSize = width < 340 ? 28 : width < 390 ? 34 : 40;
  const prayerNameSize = width < 340 ? 28 : width < 390 ? 31 : 34;

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundBlue}
      />

      <SafeAreaView
        style={[
          styles.safeTop,
          isCompact && styles.safeTopCompact,
          androidTopInset > 0 && { paddingTop: TOP_SECTION_PADDING + androidTopInset },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.dateText}>{dateString}</Text>
            <View style={[styles.locationPill, isCompact && styles.locationPillCompact]}>
              <LocationPinIllustration
                size={20}
                centerFill={Colors.backgroundBlue}
              />
              <Text
                style={[styles.locationText, { maxWidth: locationMaxWidth }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {locationLabel || 'Finding location...'}
              </Text>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.textFrost}
                  style={styles.locationSpinner}
                />
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            style={[styles.settingsBtn, isCompact && styles.settingsBtnCompact]}
            onPress={() => navigation?.navigate('Settings')}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
          >
            <SettingsGearIllustration size={22} />
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Text style={[styles.nextLabel, isCompact && styles.nextLabelCompact]}>NEXT PRAYER</Text>
          <LinearGradient
            colors={[Colors.goldStart, Colors.goldMid, Colors.goldEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextCardBorder}
          >
            <View style={[styles.nextCard, isCompact && styles.nextCardCompact]}>
              <Text style={[styles.nextPrayerName, { fontSize: prayerNameSize }]}>{nextPrayer?.name}</Text>
              <Text style={[styles.countdown, { fontSize: countdownSize }, isCompact && styles.countdownCompact]}>
                {countdown}
              </Text>
              <View style={styles.startsRow}>
                <View style={styles.startsDot} />
                <Text style={styles.startsAt}>
                  Starts at{' '}
                  <Text style={styles.startsAtTime}>{nextPrayer?.time}</Text>
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>

      <View style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHead}>
          <Text style={styles.sheetTitle}>Prayer times</Text>
          <Text style={styles.sheetHint}>Tap the bell to set reminders</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.prayerList}
          showsVerticalScrollIndicator={false}
        >
          {prayers.map((prayer) => (
            <PrayerCard
              key={prayer.id}
              prayer={prayer}
              isNext={prayer.id === nextPrayer?.id}
            />
          ))}
        </ScrollView>
        <View style={styles.tabBarWrapper}>
          <MainTabBar activeTab="home" navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  safeTop: {
    backgroundColor: Colors.backgroundBlue,
    paddingHorizontal: Spacing.lg,
    paddingTop: TOP_SECTION_PADDING,
    paddingBottom: Spacing.md,
  },
  safeTopCompact: {
    paddingHorizontal: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  dateText: {
    ...Fonts.medium,
    fontSize: 15,
    color: Colors.textFrost,
    letterSpacing: 0.2,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    alignSelf: 'flex-start',
    maxWidth: '100%',
    backgroundColor: 'rgba(23, 68, 108, 0.55)',
    paddingVertical: 6,
    paddingRight: 14,
    paddingLeft: 8,
    borderRadius: Radius.round,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  locationPillCompact: {
    paddingRight: 10,
    paddingLeft: 7,
  },
  locationText: {
    ...Fonts.semiBold,
    fontSize: 15,
    color: Colors.textWhite,
    flexShrink: 1,
  },
  locationSpinner: {
    marginLeft: 4,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'transparent',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  settingsBtnCompact: {
    width: 40,
    height: 40,
  },

  hero: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  nextLabel: {
    ...Fonts.regular,
    fontSize: 12,
    color: Colors.textGrey,
    letterSpacing: 2,
    marginBottom: Spacing.md,
  },
  nextLabelCompact: {
    marginBottom: Spacing.sm,
    letterSpacing: 1.4,
  },
  nextCardBorder: {
    borderRadius: Radius.xl,
    padding: 1.5,
    width: '100%',
    maxWidth: 360,
  },
  nextCard: {
    borderRadius: Radius.xl - 1,
    backgroundColor: Colors.backgroundMedium,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  nextCardCompact: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  nextPrayerName: {
    ...Fonts.bold,
    fontSize: 34,
    color: Colors.gold,
    marginBottom: 4,
    textAlign: 'center',
  },
  countdown: {
    ...Fonts.medium,
    fontSize: 40,
    color: Colors.textLightAlt,
    letterSpacing: 6,
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
  countdownCompact: {
    letterSpacing: 2.5,
  },
  startsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: Spacing.md,
  },
  startsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
    opacity: 0.85,
  },
  startsAt: {
    ...Fonts.regular,
    fontSize: 15,
    color: Colors.textMuted,
  },
  startsAtTime: {
    ...Fonts.semiBold,
    color: Colors.textLight,
  },

  sheet: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.dotInactiveDark,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  sheetHead: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sheetTitle: {
    ...Fonts.bold,
    fontSize: 22,
    color: Colors.textWhite,
  },
  sheetHint: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
  },
  prayerList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  tabBarWrapper: {
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.sm,
  },
});
