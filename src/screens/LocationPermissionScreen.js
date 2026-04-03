import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors, Fonts, Spacing } from '../constants/theme';
import { PrimaryButton, GhostButton, DotIndicator } from '../components/UIComponents';

export default function LocationPermissionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <View style={styles.centerContent}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.heading}>Enable Location</Text>
          <Text style={styles.subtitle}>
            We use your location to calculate accurate prayer times,
            Qibla direction, and local Islamic events.
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <PrimaryButton
          title="Allow Location"
          onPress={() => navigation?.navigate('NotificationPermission')}
        />

        <GhostButton
          title="Enter Location Manually"
          onPress={() => navigation?.navigate('NotificationPermission')}
        />

        <DotIndicator total={3} active={1} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    paddingHorizontal: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 40,
  },
  icon: {
    fontSize: 40,
  },
  textBlock: {
    gap: Spacing.md,
    alignItems: 'center',
  },
  heading: {
    ...Fonts.bold,
    fontSize: 30,
    color: Colors.textLight,
    textAlign: 'center',
  },
  subtitle: {
    ...Fonts.regular,
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 25.6,
  },
  bottomSection: {
    paddingBottom: Spacing.xl,
    alignItems: 'center',
    gap: 16,
  },
});
