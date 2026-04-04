import React, { useState, useEffect } from 'react';
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
import { PrayerCard } from '../components/UIComponents';
import { PRAYERS } from '../constants/data';
import LocationPinIllustration from '../components/LocationPinIllustration';
import MainTabBar from '../components/MainTabBar';

function useCountdown(targetMinutes = 15, targetSeconds = 43) {
  const [time, setTime] = useState({
    hours: 0,
    minutes: targetMinutes,
    seconds: targetSeconds,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
}

export default function HomeScreen({ navigation }) {
  const countdown = useCountdown(15, 43);
  const nextPrayer = PRAYERS.find((p) => !p.completed);

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

      <SafeAreaView style={styles.safeTop}>
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>{dateString}</Text>
            <View style={styles.locationPill}>
              <LocationPinIllustration
                size={20}
                centerFill={Colors.backgroundBlue}
              />
              <Text style={styles.locationText}>Sylhet</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => navigation?.navigate('Settings')}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
          >
            <Ionicons name="settings-outline" size={22} color={Colors.textFrost} />
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Text style={styles.nextLabel}>NEXT PRAYER</Text>
          <LinearGradient
            colors={[Colors.goldStart, Colors.goldMid, Colors.goldEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextCardBorder}
          >
            <View style={styles.nextCard}>
              <Text style={styles.nextPrayerName}>{nextPrayer?.name}</Text>
              <Text style={styles.countdown}>{countdown}</Text>
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
          {PRAYERS.map((prayer) => (
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
    paddingBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: Spacing.sm,
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
    backgroundColor: 'rgba(23, 68, 108, 0.55)',
    paddingVertical: 6,
    paddingRight: 14,
    paddingLeft: 8,
    borderRadius: Radius.round,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  locationText: {
    ...Fonts.semiBold,
    fontSize: 15,
    color: Colors.textWhite,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
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
  nextPrayerName: {
    ...Fonts.bold,
    fontSize: 34,
    color: Colors.gold,
    marginBottom: 4,
  },
  countdown: {
    ...Fonts.medium,
    fontSize: 40,
    color: Colors.textLightAlt,
    letterSpacing: 6,
    fontVariant: ['tabular-nums'],
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
