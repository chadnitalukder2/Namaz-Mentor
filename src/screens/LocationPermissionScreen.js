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
import LocationPinIllustration from '../components/LocationPinIllustration';

const H_PADDING = 20;

export default function LocationPermissionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <View style={styles.centerContent}>
        <LocationPinIllustration />

        <View style={styles.copyBlock}>
          <Text style={styles.heading}>Enable Location</Text>
          <Text style={styles.subtitle}>
            We use your location to calculate accurate prayer times based on your area.
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
    paddingHorizontal: H_PADDING,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  copyBlock: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    gap: 24,
  },
  heading: {
    ...Fonts.bold,
    fontSize: 30,
    lineHeight: 39,
    color: Colors.textWarmCream,
    textAlign: 'center',
  },
  subtitle: {
    ...Fonts.regular,
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 25.6,
    paddingHorizontal: 8,
  },
  bottomSection: {
    paddingBottom: Spacing.xl,
    alignItems: 'center',
    gap: 16,
    maxWidth: 350,
    width: '100%',
    alignSelf: 'center',
  },
});
