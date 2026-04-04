import React, { useId } from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Colors } from '../constants/theme';

/** Figma export node ~370:220, viewBox 0 0 28 28 */
const PATH_CLOUD =
  'M20.3905 11.6668C20.3992 11.6667 20.4079 11.6667 20.4167 11.6667C23.3162 11.6667 25.6667 14.0171 25.6667 ' +
  '16.9167C25.6667 19.8162 23.3162 22.1667 20.4167 22.1667H8.16666C4.945 22.1667 2.33333 19.555 ' +
  '2.33333 16.3333C2.33333 13.3003 4.64797 10.8081 7.60715 10.5265M20.3905 11.6668C20.4078 ' +
  '11.4746 20.4167 11.28 20.4167 11.0833C20.4167 7.53949 17.5439 4.66666 14 4.66666C10.6438 ' +
  '4.66666 7.88938 7.24338 7.60715 10.5265M20.3905 11.6668C20.2712 12.9902 19.75 14.1979 ' +
  '18.9499 15.1667L20.3905 11.6668ZM7.60715 10.5265C7.7913 10.5089 7.97793 10.5 8.16666 10.5' +
  'C9.48012 10.5 10.6922 10.9341 11.6672 11.6667';

export default function AsrPrayerIcon({ size = 28 }) {
  const gradId = `asr-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel="Asr, sun and cloud"
    >
      <Defs>
        <LinearGradient
          id={gradId}
          x1="14.0023"
          y1="4.66708"
          x2="14.0016"
          y2="22.1667"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={Colors.goldStart} offset="0" />
          <Stop stopColor={Colors.goldMid} offset="0.5" />
          <Stop stopColor={Colors.goldEnd} offset="1" />
        </LinearGradient>
      </Defs>
      <Path d={PATH_CLOUD} fill={`url(#${gradId})`} />
    </Svg>
  );
}
