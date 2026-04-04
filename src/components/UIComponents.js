import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import NotificationBellIllustration from './NotificationBellIllustration';
import {
  TabHomeIcon,
  TabQuranIcon,
  TabQiblaIcon,
  TabDhikrIcon,
} from './MainTabIcons';
import FajrPrayerIcon from './FajrPrayerIcon';
import DhuhrPrayerIcon from './DhuhrPrayerIcon';
import AsrPrayerIcon from './AsrPrayerIcon';
import MaghribPrayerIcon from './MaghribPrayerIcon';
import IshaPrayerIcon from './IshaPrayerIcon';

const PRAYER_SVG_ICONS = {
  fajr: FajrPrayerIcon,
  dhuhr: DhuhrPrayerIcon,
  asr: AsrPrayerIcon,
  maghrib: MaghribPrayerIcon,
  isha: IshaPrayerIcon,
};

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
export const DotIndicator = ({ total, active }) => {
  const inactiveIndices = [...Array(total).keys()]
    .filter((i) => i !== active)
    .sort((a, b) => a - b);
  const inactiveColorByIndex = inactiveIndices.reduce((acc, idx, order) => {
    acc[idx] = order === 0 ? Colors.dotInactiveDark : Colors.dotInactive;
    return acc;
  }, {});

  return (
    <View style={styles.dotRow}>
      {Array.from({ length: total }).map((_, i) =>
        i === active ? (
          <View key={i} style={styles.dotActivePill} />
        ) : (
          <View
            key={i}
            style={[
              styles.dotInactivePill,
              { backgroundColor: inactiveColorByIndex[i] },
            ]}
          />
        )
      )}
    </View>
  );
};

// ─── Prayer Row Card ─────────────────────────────────────────────
export const PrayerCard = ({ prayer, isNext }) => {
  const iconColor = isNext ? Colors.gold : Colors.textGrey;
  const SvgIcon = PRAYER_SVG_ICONS[prayer.icon];

  return (
    <View style={[styles.prayerCard, isNext && styles.prayerCardNext]}>
      <View style={styles.prayerLeft}>
        {SvgIcon ? (
          <View style={[styles.prayerSvgIconWrap, !isNext && styles.prayerIconMuted]}>
            <SvgIcon size={28} />
          </View>
        ) : (
          <MaterialCommunityIcons
            name="mosque"
            size={26}
            color={iconColor}
            style={styles.prayerIconGlyph}
          />
        )}
        <Text style={[styles.prayerName, isNext && styles.prayerNameNext]}>
          {prayer.name}
        </Text>
      </View>
      <View style={styles.prayerRight}>
        <Text style={[styles.prayerTime, isNext && styles.prayerTimeNext]}>
          {prayer.time}
        </Text>
        {prayer.completed ? (
          <MaterialCommunityIcons
            name="check-all"
            size={22}
            color="#4CAF50"
          />
        ) : (
          <NotificationBellIllustration size={24} compact />
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

const TAB_ICONS_UI = {
  home: TabHomeIcon,
  quran: TabQuranIcon,
  qibla: TabQiblaIcon,
  dhikr: TabDhikrIcon,
};

// ─── Tab Bar ──────────────────────────────────────────────────────
export const TabBar = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'quran', label: 'Quran' },
    { id: 'qibla', label: 'Qibla' },
    { id: 'dhikr', label: 'Dhikr' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const Icon = TAB_ICONS_UI[tab.id];
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            style={[styles.tabItem, isActive && styles.tabItemActive]}
            activeOpacity={0.8}
          >
            <View style={styles.tabIconSlot}>
              <Icon size={24} active={isActive} />
            </View>
            {isActive && <Text style={styles.tabLabel}>{tab.label}</Text>}
          </TouchableOpacity>
        );
      })}
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
    backgroundColor: Colors.gold,
    height: 48,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryBtnText: {
    ...Fonts.semiBold,
    fontSize: 14,
    lineHeight: 24,
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
  dotActivePill: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dotActivePill,
  },
  dotInactivePill: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  prayerIconGlyph: {
    marginRight: 2,
  },
  prayerSvgIconWrap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  prayerIconMuted: {
    opacity: 0.5,
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
  tabIconSlot: {
    justifyContent: 'center',
    alignItems: 'center',
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
