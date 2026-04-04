import React, { useId } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Colors } from '../constants/theme';

const DEFAULT_ICON_SIZE = 44;

/** From Figma export (frame ~370:96), viewBox 0 0 44 44 */
const PATH_PIN_OUTER =
  'M22 3.66669C30.9294 3.66669 38.5 11.0605 38.5 20.0307C38.5 29.1436 30.8061 35.5386 23.6995 39.8873C23.1816 40.1797 22.5958 40.3334 22 40.3334C21.4042 40.3334 20.8184 40.1797 20.3005 39.8873C13.2071 35.4963 5.5 29.1751 5.5 20.0307C5.5 11.0605 13.0706 3.66669 22 3.66669Z';

const PATH_PIN_INNER =
  'M28.4165 20.1667C28.4165 23.7105 25.5436 26.5833 21.9998 26.5833C18.456 26.5833 15.5831 23.7105 15.5831 20.1667C15.5831 16.6228 18.456 13.75 21.9998 13.75C25.5436 13.75 28.4165 16.6228 28.4165 20.1667Z';

export default function LocationPinIllustration({
  size = DEFAULT_ICON_SIZE,
  centerFill = Colors.backgroundDark,
}) {
  const gradId = `loc-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const ring = Math.max(28, Math.round((size * 80) / DEFAULT_ICON_SIZE));

  return (
    <View
      style={[styles.row, { width: ring, height: ring, maxWidth: ring }]}
      accessible
      accessibilityLabel="Location pin"
    >
      <View style={[styles.circle, { width: ring, height: ring, borderRadius: ring / 2 }]}>
        <Svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          accessibilityRole="image"
        >
          <Defs>
            <LinearGradient
              id={gradId}
              x1="22.0033"
              y1="3.66758"
              x2="22.001"
              y2="40.3334"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor={Colors.goldStart} offset="0" />
              <Stop stopColor={Colors.goldMid} offset="0.5" />
              <Stop stopColor={Colors.goldEnd} offset="1" />
            </LinearGradient>
          </Defs>
          <Path d={PATH_PIN_OUTER} fill={`url(#${gradId})`} />
          <Path d={PATH_PIN_INNER} fill={centerFill} />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
