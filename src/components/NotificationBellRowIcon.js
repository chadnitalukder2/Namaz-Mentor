import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../constants/theme';

/** Figma export — 24×24 notification bell (settings row) */
const PATH_CLAPPER =
  'M10.2666 20.9971C10.4421 21.3011 10.6946 21.5535 10.9986 21.7291C11.3027 21.9046 11.6475 21.997 11.9986 21.997C12.3497 21.997 12.6945 21.9046 12.9986 21.7291C13.3026 21.5535 13.5551 21.3011 13.7306 20.9971';

const PATH_BELL =
  'M3.26148 15.3239C3.13086 15.4671 3.04466 15.6451 3.01337 15.8364C2.98207 16.0276 3.00703 16.2239 3.08521 16.4012C3.16338 16.5785 3.29141 16.7293 3.45371 16.8352C3.61601 16.9411 3.80558 16.9976 3.99938 16.9977H19.9972C20.191 16.9978 20.3806 16.9415 20.543 16.8358C20.7054 16.7301 20.8336 16.5795 20.912 16.4023C20.9903 16.2251 21.0155 16.0289 20.9845 15.8377C20.9535 15.6464 20.8675 15.4683 20.7371 15.3249C19.4073 13.9541 17.9975 12.4973 17.9975 7.99894C17.9975 6.40785 17.3654 4.88194 16.2403 3.75687C15.1153 2.63181 13.5894 1.99976 11.9983 1.99976C10.4072 1.99976 8.88129 2.63181 7.75622 3.75687C6.63116 4.88194 5.9991 6.40785 5.9991 7.99894C5.9991 12.4973 4.5883 13.9541 3.26148 15.3239Z';

const STROKE = 1.99973;

export default function NotificationBellRowIcon({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" accessibilityRole="image">
      <Path
        d={PATH_CLAPPER}
        stroke="#FDFDFF"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={PATH_BELL}
        fill={Colors.textMuted}
        stroke={Colors.textMuted}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
