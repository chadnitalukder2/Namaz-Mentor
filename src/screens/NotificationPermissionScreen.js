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
import NotificationBellIllustration from '../components/NotificationBellIllustration';

const H_PADDING = 20;

export default function NotificationPermissionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <View style={styles.centerContent}>
        <NotificationBellIllustration />

        <View style={styles.copyBlock}>
          <Text style={styles.heading}>
            Enable Adhan{'\n'}Notifications
          </Text>
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
    color: Colors.textFrost,
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
