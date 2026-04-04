import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../constants/theme';
import {
  TabHomeIcon,
  TabQuranIcon,
  TabQiblaIcon,
  TabDhikrIcon,
} from './MainTabIcons';

const TAB_ICON_BY_ID = {
  home: TabHomeIcon,
  quran: TabQuranIcon,
  qibla: TabQiblaIcon,
  dhikr: TabDhikrIcon,
};

/** Bottom navigation: Figma pill + SVG tab icons. */
export default function MainTabBar({ navigation, activeTab }) {
  const tabs = [
    { id: 'home', label: 'Home', screen: 'Home' },
    { id: 'quran', label: 'Quran', screen: 'Quran' },
    { id: 'qibla', label: 'Qibla', screen: 'Qibla' },
    { id: 'dhikr', label: 'Dhikr', screen: 'Dhikr' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = TAB_ICON_BY_ID[tab.id];
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => navigation?.navigate(tab.screen)}
            style={[styles.tabItem, isActive && styles.tabItemActive]}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View style={styles.iconSlot}>
              <Icon size={24} active={isActive} />
            </View>
            {isActive && <Text style={styles.tabLabel}>{tab.label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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
  iconSlot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    ...Fonts.medium,
    fontSize: 12,
    color: Colors.textWhite,
  },
});
