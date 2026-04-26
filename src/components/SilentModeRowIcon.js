import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../constants/theme';

const PATH_SPEAKER =
  'M10.9985 4.70132C10.9983 4.56205 10.9569 4.42596 10.8794 4.31023C10.8019 4.1945 10.6919 4.10431 10.5632 4.05104C10.4346 3.99777 10.293 3.98381 10.1564 4.01093C10.0198 4.03804 9.89427 4.10501 9.79569 4.20339L6.41215 7.58593C6.28157 7.71729 6.12623 7.82142 5.95511 7.89231C5.78399 7.96319 5.60051 7.99941 5.41529 7.99887H2.99962C2.73444 7.99887 2.48012 8.10421 2.29261 8.29172C2.1051 8.47924 1.99976 8.73355 1.99976 8.99873V14.9979C1.99976 15.2631 2.1051 15.5174 2.29261 15.7049C2.48012 15.8924 2.73444 15.9978 2.99962 15.9978H5.41529C5.60051 15.9972 5.78399 16.0335 5.95511 16.1043C6.12623 16.1752 6.28157 16.2794 6.41215 16.4107L9.79469 19.7943C9.89328 19.893 10.019 19.9603 10.1558 19.9876C10.2927 20.0149 10.4346 20.0009 10.5635 19.9475C10.6924 19.8941 10.8026 19.8036 10.88 19.6875C10.9575 19.5714 10.9987 19.4349 10.9985 19.2953V4.70132Z';

const PATH_MUTE_A = 'M21.9978 8.99878L15.9978 14.9988';
const PATH_MUTE_B = 'M15.9978 8.99878L21.9978 14.9988';

const STROKE = 1.99973;

/** Figma export — 24×24 muted speaker (settings row) */
export default function SilentModeRowIcon({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" accessibilityRole="image">
      <Path
        d={PATH_SPEAKER}
        fill={Colors.textMuted}
        stroke={Colors.textMuted}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={PATH_MUTE_A}
        stroke={Colors.textLight}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d={PATH_MUTE_B}
        stroke={Colors.textLight}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
