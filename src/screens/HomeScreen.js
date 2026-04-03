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
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { PrayerCard } from '../components/UIComponents';
import { PRAYERS } from '../constants/data';

// ─── Mosque Silhouette (SVG-like using Views) ────────────────────
const MosqueSilhouette = () => (
  <View style={silhouetteStyles.container}>
    {/* Simple decorative gradient overlay - the "sky" */}
    <View style={silhouetteStyles.sky} />
    <View style={silhouetteStyles.ground} />
    {/* Central dome */}
    <View style={silhouetteStyles.centralDome} />
    {/* Minaret left */}
    <View style={silhouetteStyles.minaretLeft} />
    <View style={silhouetteStyles.minaretLeftTop} />
    {/* Minaret right */}
    <View style={silhouetteStyles.minaretRight} />
    <View style={silhouetteStyles.minaretRightTop} />
    {/* Side domes */}
    <View style={silhouetteStyles.sideDomeLeft} />
    <View style={silhouetteStyles.sideDomeRight} />
  </View>
);

const silhouetteStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 460,
    left: 0,
    right: 0,
    height: 120,
    overflow: 'hidden',
  },
  sky: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: Colors.backgroundBlue,
    opacity: 0.6,
  },
  ground: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 30,
    backgroundColor: '#0d2d47',
  },
  centralDome: {
    position: 'absolute',
    bottom: 20,
    left: '42%',
    width: 60,
    height: 50,
    backgroundColor: '#0d2d47',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  minaretLeft: {
    position: 'absolute',
    bottom: 20,
    left: '28%',
    width: 12,
    height: 80,
    backgroundColor: '#0d2d47',
  },
  minaretLeftTop: {
    position: 'absolute',
    bottom: 95,
    left: 'calc(28% - 4px)',
    width: 20,
    height: 20,
    backgroundColor: '#0d2d47',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  minaretRight: {
    position: 'absolute',
    bottom: 20,
    right: '28%',
    width: 12,
    height: 80,
    backgroundColor: '#0d2d47',
  },
  minaretRightTop: {
    position: 'absolute',
    bottom: 95,
    right: 'calc(28% - 4px)',
    width: 20,
    height: 20,
    backgroundColor: '#0d2d47',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sideDomeLeft: {
    position: 'absolute',
    bottom: 20,
    left: '32%',
    width: 40,
    height: 32,
    backgroundColor: '#0d2d47',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sideDomeRight: {
    position: 'absolute',
    bottom: 20,
    right: '32%',
    width: 40,
    height: 32,
    backgroundColor: '#0d2d47',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

// ─── Countdown Timer Hook ────────────────────────────────────────
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

// ─── Home Screen ─────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const countdown = useCountdown(15, 43);
  const nextPrayer = PRAYERS.find((p) => !p.completed);

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundBlue} />

      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>{dateString}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationPin}>📍</Text>
              <Text style={styles.locationText}>Sylhet</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => navigation?.navigate('Settings')}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Next Prayer Hero */}
      <View style={styles.heroSection}>
        <Text style={styles.nextPrayerLabel}>NEXT PRAYER</Text>
        <Text style={styles.nextPrayerName}>{nextPrayer?.name}</Text>
        <Text style={styles.countdown}>{countdown}</Text>
        <Text style={styles.startsAt}>Starts at {nextPrayer?.time}</Text>
      </View>

      {/* Mosque silhouette decorative */}
      <View style={styles.silhouetteArea}>
        <Text style={styles.mosqueEmoji}>🕌</Text>
      </View>

      {/* Prayer List Card */}
      <View style={styles.bottomSheet}>
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

        {/* Tab Bar */}
        <View style={styles.tabBarWrapper}>
          <TabBar activeTab="home" navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

// ─── Inline Tab Bar ───────────────────────────────────────────────
function TabBar({ activeTab, navigation }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠', screen: 'Home' },
    { id: 'quran', label: 'Quran', icon: '📖', screen: 'Quran' },
    { id: 'qibla', label: 'Qibla', icon: '🧭', screen: 'Qibla' },
    { id: 'dhikr', label: 'Dhikr', icon: '🔮', screen: 'Dhikr' },
  ];

  return (
    <View style={tabStyles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => navigation?.navigate(tab.screen)}
          style={[
            tabStyles.tabItem,
            activeTab === tab.id && tabStyles.tabItemActive,
          ]}
          activeOpacity={0.8}
        >
          <Text style={tabStyles.tabIcon}>{tab.icon}</Text>
          {activeTab === tab.id && (
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
  tabIcon: {
    fontSize: 18,
  },
  tabLabel: {
    ...Fonts.medium,
    fontSize: 12,
    color: Colors.textWhite,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBlue,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
  },
  dateText: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textGrey,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationPin: { fontSize: 14 },
  locationText: {
    ...Fonts.medium,
    fontSize: 14,
    color: Colors.textWhite,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: { fontSize: 18 },

  heroSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 8,
    gap: 6,
  },
  nextPrayerLabel: {
    ...Fonts.regular,
    fontSize: 14,
    color: '#FCFCFF',
    letterSpacing: 1,
  },
  nextPrayerName: {
    ...Fonts.bold,
    fontSize: 32,
    color: Colors.gold,
  },
  countdown: {
    ...Fonts.medium,
    fontSize: 40,
    color: Colors.textLightAlt,
    letterSpacing: 4,
  },
  startsAt: {
    ...Fonts.medium,
    fontSize: 18,
    color: Colors.textLight,
  },

  silhouetteArea: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  mosqueEmoji: {
    fontSize: 60,
    opacity: 0.6,
  },

  bottomSheet: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  prayerList: {
    padding: 16,
    gap: 12,
    paddingBottom: 8,
  },
  tabBarWrapper: {
    paddingBottom: 24,
    paddingTop: 8,
  },
});
