import React, { useId } from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Colors } from '../constants/theme';

/** Figma export node ~370:186, viewBox 0 0 28 28 */
const PATH_RAYS =
  'M3.45262 11.8926C2.58842 8.71709 4.50242 5.45296 ' +
  '7.72764 4.60207M3.45262 11.8926L2.33333 12.1879M3.45262 11.8926C3.66752 12.6824 4.03398 ' +
  '13.3922 4.51293 14M7.72764 4.60207L7.42773 3.5M7.72764 4.60207C10.1112 3.97323 12.5438 ' +
  '4.83839 14 6.61454M4.05591 7.3768L2.87513 6.70399M12.9975 4.03346L12.3165 5.19743';

const PATH_CLOUD =
  'M8.75 4.66669L4.66667 6.41669L3.5 8.75002V12.25L5.25 15.75L6.41667 14.5834L12.8333 ' +
  '10.5L15.1667 8.16669L13.4167 6.41669L11.6667 4.66669H8.75Z';

const PATH_SUN =
  'M20.3905 14.0001C20.3992 14 20.4079 14 20.4167 14C23.3162 14 25.6667 16.3505 25.6667 ' +
  '19.25C25.6667 22.1495 23.3162 24.5 20.4167 24.5H8.16666C4.945 24.5 2.33333 21.8883 ' +
  '2.33333 18.6667C2.33333 15.6337 4.64797 13.1414 7.60715 12.8598M20.3905 ' +
  '14.0001C20.4078 13.808 20.4167 13.6134 20.4167 13.4167C20.4167 9.87283 17.5439 7 14 ' +
  '7C10.6438 7 7.88938 9.57672 7.60715 12.8598M20.3905 14.0001C20.2712 15.3236 19.75 ' +
  '16.5312 18.9499 17.5L20.3905 14.0001ZM7.60715 12.8598C7.7913 12.8423 7.97793 12.8333 ' +
  '8.16666 12.8333C9.48012 12.8333 10.6922 13.2674 11.6672 14';

const RAY_STROKE = '#FFE9C2';

export default function FajrPrayerIcon({ size = 28 }) {
  const gradId = `fajr-sun-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel="Fajr, sun and clouds"
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
      <Path
        d={PATH_RAYS}
        stroke={RAY_STROKE}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path d={PATH_CLOUD} fill={RAY_STROKE} />
      <Path d={PATH_SUN} fill={`url(#${gradId})`} />
    </Svg>
  );
}
