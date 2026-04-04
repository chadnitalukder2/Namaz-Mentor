import React, { useId } from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Colors } from '../constants/theme';

/** Figma export node ~370:252, viewBox 0 0 28 28 */
const PATH_MOON =
  'M25.0833 16.4248C23.6837 17.1721 22.0851 17.5958 20.3876 17.5958C14.874 17.5958 10.4042 ' +
  '13.1261 10.4042 7.61233C10.4042 5.91484 10.8279 4.3163 11.5752 2.91667C6.61226 4.07982 ' +
  '2.91667 8.53432 2.91667 13.852C2.91667 20.0549 7.94512 25.0833 14.1481 25.0833C19.4657 ' +
  '25.0833 23.9202 21.3878 25.0833 16.4248Z';

export default function IshaPrayerIcon({ size = 28 }) {
  const gradId = `isha-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel="Isha, moon"
    >
      <Defs>
        <LinearGradient
          id={gradId}
          x1="14.0022"
          y1="2.91721"
          x2="14.001"
          y2="25.0833"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={Colors.goldStart} offset="0" />
          <Stop stopColor={Colors.goldMid} offset="0.5" />
          <Stop stopColor={Colors.goldEnd} offset="1" />
        </LinearGradient>
      </Defs>
      <Path d={PATH_MOON} fill={`url(#${gradId})`} />
    </Svg>
  );
}
