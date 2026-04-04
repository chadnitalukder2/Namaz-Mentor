import React, { useId } from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Colors } from '../constants/theme';

/** Figma export node ~370:203, viewBox 0 0 28 28 */
const PATH_DISC =
  'M19.8333 14C19.8333 17.2216 17.2216 19.8333 14 19.8333C10.7783 19.8333 8.16667 ' +
  '17.2216 8.16667 14C8.16667 10.7783 10.7783 8.16666 14 8.16666C17.2216 8.16666 19.8333 ' +
  '10.7783 19.8333 14Z';

const PATH_RAYS =
  'M14 2.33334V4.08334M14 23.9167V25.6667M22.2493 22.2499L21.0118 21.0124M6.98746 ' +
  '6.98748L5.75003 5.75004M25.6667 14H23.9167M4.08333 14H2.33333M22.2498 5.75017L21.0124 ' +
  '6.98761M6.98804 21.0125L5.7506 22.25';

const RAY_STROKE = '#FFE9C2';

export default function DhuhrPrayerIcon({ size = 28 }) {
  const gradId = `dhuhr-sun-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel="Dhuhr, sun"
    >
      <Defs>
        <LinearGradient
          id={gradId}
          x1="14.0012"
          y1="8.16694"
          x2="14.0005"
          y2="19.8333"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={Colors.goldStart} offset="0" />
          <Stop stopColor={Colors.goldMid} offset="0.5" />
          <Stop stopColor={Colors.goldEnd} offset="1" />
        </LinearGradient>
      </Defs>
      <Path d={PATH_DISC} fill={`url(#${gradId})`} />
      <Path
        d={PATH_RAYS}
        stroke={RAY_STROKE}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
