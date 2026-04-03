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

export default function NotificationPermissionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <View style={styles.centerContent}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🔔</Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.heading}>Enable Adhan{'\n'}Notifications</Text>
          <Text style={styles.subtitle}>
            Receive prayer reminders and Adhan alerts on time.
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <PrimaryButton
          title="Enable Notifications"
          onPress={() => navigation?.navigate('Home')}
        />

        <GhostButton
          title="Skip for Now"
          onPress={() => navigation?.navigate('Home')}
        />

        <DotIndicator total={3} active={2} />
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
    lineHeight: 39,
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
