import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';

// ─── Primary Button ──────────────────────────────────────────────
export const PrimaryButton = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.primaryBtn, style]} onPress={onPress} activeOpacity={0.85}>
    <Text style={styles.primaryBtnText}>{title}</Text>
  </TouchableOpacity>
);

// ─── Ghost Button ────────────────────────────────────────────────
export const GhostButton = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={style}>
    <Text style={styles.ghostBtnText}>{title}</Text>
  </TouchableOpacity>
);

// ─── Dot Indicator ───────────────────────────────────────────────
export const DotIndicator = ({ total, active }) => (
  <View style={styles.dotRow}>
    {Array.from({ length: total }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          i === active ? styles.dotActive : styles.dotInactive,
        ]}
      />
    ))}
  </View>
);

// ─── Prayer Row Card ─────────────────────────────────────────────
export const PrayerCard = ({ prayer, isNext }) => {
  const prayerIcons = {
    'sun-cloud': '🌤',
    sun: '☀️',
    cloud: '☁️',
    'moon-cloud': '🌙',
    moon: '🌑',
  };

  return (
    <View style={[styles.prayerCard, isNext && styles.prayerCardNext]}>
      <View style={styles.prayerLeft}>
        <Text style={styles.prayerIcon}>{prayerIcons[prayer.icon] || '🕌'}</Text>
        <Text style={[styles.prayerName, isNext && styles.prayerNameNext]}>
          {prayer.name}
        </Text>
      </View>
      <View style={styles.prayerRight}>
        <Text style={[styles.prayerTime, isNext && styles.prayerTimeNext]}>
          {prayer.time}
        </Text>
        {prayer.completed ? (
          <Text style={styles.checkIcon}>✓✓</Text>
        ) : (
          <Text style={styles.bellIcon}>🔔</Text>
        )}
      </View>
    </View>
  );
};

// ─── Section Header ───────────────────────────────────────────────
export const SectionHeader = ({ title, style }) => (
  <Text style={[styles.sectionHeader, style]}>{title}</Text>
);

// ─── Back Button ──────────────────────────────────────────────────
export const BackButton = ({ onPress }) => (
  <TouchableOpacity style={styles.backBtn} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.backBtnText}>‹</Text>
  </TouchableOpacity>
);

// ─── Tab Bar ──────────────────────────────────────────────────────
export const TabBar = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '⊞' },
    { id: 'quran', label: 'Quran', icon: '📖' },
    { id: 'qibla', label: 'Qibla', icon: '🧭' },
    { id: 'dhikr', label: 'Dhikr', icon: '🔮' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => onTabPress(tab.id)}
          style={[styles.tabItem, activeTab === tab.id && styles.tabItemActive]}
          activeOpacity={0.8}
        >
          <Text style={styles.tabIcon}>{tab.icon}</Text>
          {activeTab === tab.id && (
            <Text style={styles.tabLabel}>{tab.label}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ─── Gold Text ───────────────────────────────────────────────────
export const GoldText = ({ children, style }) => (
  <Text style={[styles.goldText, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  // Primary Button
  primaryBtn: {
    backgroundColor: Colors.buttonLight,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryBtnText: {
    ...Fonts.semiBold,
    fontSize: 14,
    color: Colors.backgroundDark,
  },

  // Ghost Button
  ghostBtnText: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
  },

  // Dot Indicator
  dotRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 100,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.textWhite,
  },
  dotInactive: {
    width: 8,
    backgroundColor: Colors.dotInactive,
  },

  // Prayer Card
  prayerCard: {
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prayerCardNext: {
    borderWidth: 1,
    borderColor: 'rgba(217, 170, 85, 0.3)',
    backgroundColor: '#0a2040',
  },
  prayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  prayerIcon: {
    fontSize: 22,
  },
  prayerName: {
    ...Fonts.medium,
    fontSize: 18,
    color: Colors.textPrayerName,
  },
  prayerNameNext: {
    color: Colors.textWhite,
  },
  prayerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prayerTime: {
    ...Fonts.medium,
    fontSize: 14,
    color: Colors.textSubtle,
  },
  prayerTimeNext: {
    color: Colors.gold,
  },
  checkIcon: {
    fontSize: 14,
    color: '#4CAF50',
  },
  bellIcon: {
    fontSize: 16,
    color: Colors.textMuted,
  },

  // Section Header
  sectionHeader: {
    ...Fonts.bold,
    fontSize: 20,
    color: Colors.textWhite,
  },

  // Back Button
  backBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontSize: 32,
    color: Colors.textWhite,
    lineHeight: 32,
    marginTop: -6,
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundBlue,
    borderRadius: Radius.pill,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginHorizontal: 20,
    alignItems: 'center',
    gap: 4,
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

  // Gold Text
  goldText: {
    ...Fonts.bold,
    color: Colors.gold,
  },
});
