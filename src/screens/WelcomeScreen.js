import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { PrimaryButton, GhostButton, DotIndicator } from '../components/UIComponents';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      {/* Main content - centered */}
      <View style={styles.centerContent}>
        {/* Logo / Icon */}
        <View style={styles.iconWrapper}>
          <Text style={styles.prayerEmoji}>🧎</Text>
        </View>

        {/* Heading */}
        <Text style={styles.heading}>Your Daily Islamic{'\n'}Companion</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Accurate prayer times, Quran, Qibla and Dhikr{'\n'}— all in one calm space.
        </Text>
      </View>

      {/* Bottom CTA */}
      <View style={styles.bottomSection}>
        <PrimaryButton
          title="Get Started"
          onPress={() => navigation?.navigate('LocationPermission')}
        />

        <GhostButton
          title="Already set up?"
          onPress={() => navigation?.navigate('Home')}
          style={styles.ghostBtn}
        />

        <DotIndicator total={3} active={0} />
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
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerEmoji: {
    fontSize: 52,
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
  ghostBtn: {
    paddingVertical: 4,
  },
});
