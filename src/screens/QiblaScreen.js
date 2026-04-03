import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';

// ─── Compass Component ────────────────────────────────────────────
const QiblaCompass = ({ degrees = 282 }) => {
  const compassPoints = ['N', 'E', 'S', 'W'];

  return (
    <View style={compassStyles.wrapper}>
      {/* Outer ring */}
      <View style={compassStyles.outerRing}>
        {/* Cardinal points */}
        <Text style={[compassStyles.cardinal, compassStyles.north]}>N</Text>
        <Text style={[compassStyles.cardinal, compassStyles.east]}>E</Text>
        <Text style={[compassStyles.cardinal, compassStyles.south]}>S</Text>
        <Text style={[compassStyles.cardinal, compassStyles.west]}>W</Text>

        {/* Degree markings */}
        {Array.from({ length: 36 }).map((_, i) => (
          <View
            key={i}
            style={[
              compassStyles.tick,
              {
                transform: [
                  { rotate: `${i * 10}deg` },
                  { translateY: -104 },
                ],
              },
            ]}
          />
        ))}

        {/* Direction needle */}
        <View style={[compassStyles.needle, { transform: [{ rotate: `${degrees}deg` }] }]}>
          <View style={compassStyles.needleNorth} />
          <View style={compassStyles.needleSouth} />
        </View>

        {/* Kaaba icon center */}
        <View style={compassStyles.center}>
          <Text style={compassStyles.kaabaIcon}>🕋</Text>
        </View>
      </View>
    </View>
  );
};

const compassStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  outerRing: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: 'rgba(217, 170, 85, 0.4)',
    backgroundColor: 'rgba(6, 24, 47, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardinal: {
    position: 'absolute',
    ...Fonts.bold,
    fontSize: 16,
    color: Colors.textGrey,
  },
  north: { top: 12 },
  south: { bottom: 12 },
  east: { right: 12 },
  west: { left: 12 },
  tick: {
    position: 'absolute',
    width: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    top: '50%',
    left: '50%',
    marginLeft: -0.5,
  },
  needle: {
    position: 'absolute',
    width: 4,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  needleNorth: {
    flex: 1,
    width: 4,
    backgroundColor: Colors.gold,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  needleSouth: {
    flex: 1,
    width: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  center: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(217, 170, 85, 0.5)',
  },
  kaabaIcon: { fontSize: 24 },
});

// ─── Screen ───────────────────────────────────────────────────────
export default function QiblaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Makkah, Saudi Arabia</Text>
            <Text style={styles.subtitle}>Turn to your right</Text>
          </View>
          <View style={styles.degreeBlock}>
            <Text style={styles.degree}>282°</Text>
            <Text style={styles.toQibla}>to Qibla</Text>
          </View>
        </View>

        {/* Compass */}
        <QiblaCompass degrees={282} />

        {/* Info section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoLabel}>Distance to Makkah</Text>
          </View>
          <Text style={styles.distanceText}>10,247 km</Text>
          <Text style={styles.infoHint}>
            Point your device north for accurate reading
          </Text>
        </View>
      </SafeAreaView>

      {/* Tab Bar */}
      <View style={styles.tabBarWrapper}>
        <QiblaTabBar navigation={navigation} />
      </View>
    </View>
  );
}

function QiblaTabBar({ navigation }) {
  const tabs = [
    { id: 'home', icon: '🏠', screen: 'Home' },
    { id: 'quran', icon: '📖', screen: 'Quran' },
    { id: 'qibla', icon: '🧭', screen: 'Qibla', label: 'Qibla' },
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
            tab.id === 'qibla' && tabStyles.tabItemActive,
          ]}
          activeOpacity={0.8}
        >
          <Text style={tabStyles.tabIcon}>{tab.icon}</Text>
          {tab.id === 'qibla' && (
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    ...Fonts.bold,
    fontSize: 18,
    color: Colors.textWhite,
  },
  subtitle: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textGrey,
    marginTop: 4,
  },
  degreeBlock: {
    alignItems: 'flex-end',
  },
  degree: {
    ...Fonts.bold,
    fontSize: 28,
    color: Colors.gold,
  },
  toQibla: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
  },
  infoSection: {
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  infoIcon: { fontSize: 18 },
  infoLabel: {
    ...Fonts.medium,
    fontSize: 16,
    color: Colors.textGrey,
  },
  distanceText: {
    ...Fonts.bold,
    fontSize: 28,
    color: Colors.textWhite,
  },
  infoHint: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
  tabBarWrapper: {
    paddingBottom: 24,
    paddingTop: 8,
  },
});
