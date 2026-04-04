import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';
import GradientIcon from './GradientIcon';

const ICON_SIZE = 44;

/**
 * Notification onboarding — frame 370:114 / icon 370:137: 80×80 capsule (#123859) + vertical gold gradient icon.
 * Ionicons `notifications` (filled bell + radii) matches the notification-permission metaphor.
 */
export default function NotificationBellIllustration() {
  return (
    <View style={styles.row} accessible accessibilityLabel="Notification bell">
      <View style={styles.circle}>
        <GradientIcon IconComponent={Ionicons} name="notifications" size={ICON_SIZE} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    maxWidth: 350,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.backgroundBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
