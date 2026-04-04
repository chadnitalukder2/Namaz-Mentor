import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/theme';

/** Matches WelcomeIllustration / Figma gold fills: light top → mid → dark bottom */
const GOLD_STOPS = [Colors.goldStart, Colors.goldMid, Colors.goldEnd];

/**
 * Renders a vector icon filled with the onboarding gold gradient (Figma-aligned treatment).
 */
export default function GradientIcon({ IconComponent, name, size = 44 }) {
  return (
    <MaskedView
      style={{ width: size, height: size }}
      maskElement={
        <View style={[styles.mask, { width: size, height: size }]}>
          <IconComponent name={name} size={size} color="#000000" />
        </View>
      }
    >
      <LinearGradient
        colors={GOLD_STOPS}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ width: size, height: size }}
      />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  mask: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
