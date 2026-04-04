import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';
import GradientIcon from './GradientIcon';

const MARKER_SIZE = 44;

/**
 * Location onboarding: 80×80 capsule + gradient map marker (matches Figma 370:94 structure).
 * Uses MaterialCommunityIcons map-marker — same vocabulary as typical “location pin” UI.
 */
export default function LocationPinIllustration() {
  return (
    <View style={styles.row} accessible accessibilityLabel="Location pin">
      <View style={styles.circle}>
        <GradientIcon
          IconComponent={MaterialCommunityIcons}
          name="map-marker"
          size={MARKER_SIZE}
        />
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
