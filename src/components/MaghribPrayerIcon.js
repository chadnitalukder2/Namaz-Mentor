import React, { useId } from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Colors } from '../constants/theme';

/** Figma export node ~370:235, viewBox 0 0 28 28 */
const PATH_MOON =
  'M13.0611 7.21408C12.9515 6.64997 12.8759 5.95226 12.2211 4.80683C11.5025 3.55008 ' +
  '10.3554 2.69906 9.0737 2.33334C9.27176 3.94294 8.52233 5.59036 7.04385 6.45235C5.56538 ' +
  '7.31433 3.77782 7.14603 2.49647 6.16803C2.16928 7.47174 2.32553 8.9005 3.04406 10.1572C4.01573 ' +
  '11.8567 5.77132 12.8146 7.58333 12.8333';

const PATH_SUN =
  'M20.3905 14.0001C20.3992 14 20.4079 14 20.4167 14C23.3162 14 25.6667 16.3505 25.6667 ' +
  '19.25C25.6667 22.1495 23.3162 24.5 20.4167 24.5H8.16666C4.945 24.5 2.33333 21.8883 ' +
  '2.33333 18.6667C2.33333 15.6337 4.64797 13.1415 7.60715 12.8598M20.3905 14.0001C20.4078 ' +
  '13.808 20.4167 13.6134 20.4167 13.4167C20.4167 9.87283 17.5439 7 14 7C10.6438 7 7.88938 ' +
  '9.57672 7.60715 12.8598M20.3905 14.0001C20.2712 15.3236 19.75 16.5312 18.9499 17.5L20.3905 ' +
  '14.0001ZM7.60715 12.8598C7.7913 12.8423 7.97793 12.8333 8.16666 12.8333C9.48012 12.8333 ' +
  '10.6922 13.2674 11.6672 14';

const MOON_FILL = '#FFE9C2';

export default function MaghribPrayerIcon({ size = 28 }) {
  const gradId = `maghrib-sun-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel="Maghrib, moon and sun"
    >
      <Defs>
        <LinearGradient
          id={gradId}
          x1="14.0023"
          y1="7.00043"
          x2="14.0016"
          y2="24.5"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={Colors.goldStart} offset="0" />
          <Stop stopColor={Colors.goldMid} offset="0.5" />
          <Stop stopColor={Colors.goldEnd} offset="1" />
        </LinearGradient>
      </Defs>
      <Path d={PATH_MOON} fill={MOON_FILL} />
      <Path
        d={PATH_MOON}
        stroke={MOON_FILL}
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
      <Path d={PATH_SUN} fill={`url(#${gradId})`} />
    </Svg>
  );
}
