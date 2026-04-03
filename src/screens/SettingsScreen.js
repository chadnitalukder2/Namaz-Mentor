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

const SettingRow = ({ icon, label, value, onPress }) => (
  <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.settingLeft}>
      <Text style={styles.settingIcon}>{icon}</Text>
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <View style={styles.settingRight}>
      <Text style={styles.settingValue}>{value}</Text>
      <Text style={styles.settingChevron}>›</Text>
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Settings</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Prayer Settings */}
          <Text style={styles.sectionHeader}>Prayer Settings</Text>
          <View style={styles.card}>
            <SettingRow icon="📍" label="Location" value="Sylhet" onPress={() => {}} />
            <View style={styles.rowDivider} />
            <SettingRow icon="🧮" label="Calculation Method" value="Karachi" onPress={() => {}} />
            <View style={styles.rowDivider} />
            <SettingRow icon="📚" label="Madhab" value="Hanafi" onPress={() => {}} />
            <View style={styles.rowDivider} />
            <SettingRow icon="🔊" label="Adhan Sound" value="Makkah" onPress={() => {}} />
          </View>

          {/* Notifications */}
          <Text style={styles.sectionHeader}>Notifications</Text>
          <View style={styles.card}>
            <SettingRow icon="🔔" label="Prayer Alerts" value="Enabled" onPress={() => {}} />
            <View style={styles.rowDivider} />
            <SettingRow icon="🎵" label="Adhan Audio" value="Azaan" onPress={() => {}} />
          </View>

          {/* Display */}
          <Text style={styles.sectionHeader}>Display</Text>
          <View style={styles.card}>
            <SettingRow icon="🌙" label="Theme" value="Dark" onPress={() => {}} />
            <View style={styles.rowDivider} />
            <SettingRow icon="🌐" label="Language" value="English" onPress={() => {}} />
          </View>

          {/* About */}
          <Text style={styles.sectionHeader}>About</Text>
          <View style={styles.card}>
            <SettingRow icon="ℹ️" label="App Version" value="v1.0.0" onPress={() => {}} />
            <View style={styles.rowDivider} />
            <SettingRow icon="⭐" label="Rate App" value="" onPress={() => {}} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Islamic Companion v1.0.0</Text>
            <Text style={styles.footerHeart}>Made with ♥ for the Ummah</Text>
          </View>
        </ScrollView>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
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
  pageTitle: {
    ...Fonts.bold,
    fontSize: 22,
    color: Colors.textWhite,
  },

  sectionHeader: {
    ...Fonts.medium,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  card: {
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: { fontSize: 18 },
  settingLabel: {
    ...Fonts.regular,
    fontSize: 16,
    color: Colors.textWhite,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
  },
  settingChevron: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginLeft: 48,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 6,
  },
  footerText: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
  },
  footerHeart: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
  },
});
