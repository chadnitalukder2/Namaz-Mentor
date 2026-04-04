import React, { useId } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Colors } from '../constants/theme';

const ICON_SIZE = 44;
const STROKE_WIDTH = 2.24936;

/** Figma export (frame ~370:139), viewBox 0 0 44 44 */
const PATH_BELL =
  'M35.257 33H8.74293C6.95191 33 5.5 31.548 5.5 29.757C5.5 28.897 5.84166 28.0722 6.44983 27.4639L7.55575 26.358C8.5872 25.3266 9.16667 23.9275 9.16667 22.4689V17.4166C9.16667 10.329 14.9124 4.58331 22 4.58331C29.0877 4.58331 34.8333 10.329 34.8333 17.4166V22.4689C34.8333 23.9275 35.4129 25.3266 36.4443 26.358L37.5501 27.4639C38.1583 28.0722 38.5 28.897 38.5 29.757C38.5 31.548 37.048 33 35.257 33Z';

const PATH_CLAPPER =
  'M28.4167 33C28.4167 36.5438 25.5438 39.4167 22 39.4167C18.4562 39.4167 15.5833 36.5438 15.5833 33';

/**
 * Notification onboarding — capsule (#123859) + bell from Figma (gold gradient fill/stroke).
 */
export default function NotificationBellIllustration() {
  const gradId = `notif-gold-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <View style={styles.row} accessible accessibilityLabel="Notification bell">
      <View style={styles.circle}>
        <Svg
          width={ICON_SIZE}
          height={ICON_SIZE}
          viewBox="0 0 44 44"
          fill="none"
          accessibilityRole="image"
        >
          <Defs>
            <LinearGradient
              id={gradId}
              x1="22.0033"
              y1="4.58401"
              x2="22.0019"
              y2="33"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor={Colors.goldStart} offset="0" />
              <Stop stopColor={Colors.goldMid} offset="0.5" />
              <Stop stopColor={Colors.goldEnd} offset="1" />
            </LinearGradient>
          </Defs>
          <Path
            d={PATH_CLAPPER}
            stroke={Colors.gold}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={PATH_BELL}
            fill={`url(#${gradId})`}
            stroke={`url(#${gradId})`}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
