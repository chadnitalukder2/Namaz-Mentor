import React, { useId } from 'react';
import Svg, { Defs, LinearGradient, Mask, Path, Stop } from 'react-native-svg';
import { Colors } from '../constants/theme';

const BLUE_SOFT = '#749ABB';
const BLUE_DEEP = '#123859';

const HOME_INACTIVE_ROOF =
  'M12.818 2.57567L20.697 8.79585C20.9936 9.03004 21.1667 9.38713 21.1667 9.76507C21.1667 ' +
  '10.4472 20.6138 11 19.9317 11H19.3333V14.2083C19.3333 16.801 19.3333 18.0974 18.5279 ' +
  '18.9029C17.7224 19.7083 16.426 19.7083 13.8333 19.7083H10.1667C7.57395 19.7083 6.27759 ' +
  '19.7083 5.47213 18.9029C4.66668 18.0974 4.66668 16.801 4.66668 14.2083V11H4.06824C3.38623 ' +
  '11 2.83334 10.4472 2.83334 9.76507C2.83334 9.38713 3.00641 9.03004 3.30304 8.79585L11.182 ' +
  '2.57567C11.4149 2.39173 11.7031 2.29167 12 2.29167C12.2969 2.29167 12.5851 2.39173 12.818 2.57567Z';

const HOME_INACTIVE_DOOR =
  'M14.2917 19.7083V15.5833C14.2917 14.7266 14.2917 14.2982 14.1074 13.9792C13.9868 ' +
  '13.7702 13.8132 13.5965 13.6042 13.4759C13.2851 13.2917 12.8567 13.2917 12 13.2917C11.1433 ' +
  '13.2917 10.7149 13.2917 10.3958 13.4759C10.1868 13.5965 10.0132 13.7702 9.89256 ' +
  '13.9792C9.70834 14.2982 9.70834 14.7266 9.70834 15.5833V19.7083';

/** Home — Figma 24×24 inactive; 22×22 active (pill) */
export function TabHomeIcon({ size = 24, active = false }) {
  const w = size;
  const h = size;

  if (active) {
    const gradId = `home-tab-active-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const pathRoof =
      'M11.818 2.57567L19.697 8.79585C19.9936 9.03004 20.1667 9.38713 20.1667 9.76507C20.1667 ' +
      '10.4472 19.6138 11 18.9317 11H18.3333V14.2083C18.3333 16.801 18.3333 18.0974 17.5279 ' +
      '18.9029C16.7224 19.7083 15.426 19.7083 12.8333 19.7083H9.16666C6.57394 19.7083 5.27758 ' +
      '19.7083 4.47212 18.9029C3.66666 18.0974 3.66666 16.801 3.66666 14.2083V11H3.06823' +
      'C2.38622 11 1.83333 10.4472 1.83333 9.76507C1.83333 9.38713 2.00639 9.03004 2.30303 ' +
      '8.79585L10.182 2.57567C10.4149 2.39173 10.7031 2.29167 11 2.29167C11.2969 2.29167 11.5851 ' +
      '2.39173 11.818 2.57567Z';
    const pathDoor =
      'M13.2917 19.7083V15.5833C13.2917 14.7266 13.2917 14.2982 13.1074 13.9792C12.9868 ' +
      '13.7702 12.8132 13.5965 12.6042 13.4759C12.2851 13.2917 11.8567 13.2917 11 13.2917' +
      'C10.1433 13.2917 9.71492 13.2917 9.39583 13.4759C9.18683 13.5965 9.01322 13.7702 ' +
      '8.89254 13.9792C8.70833 14.2982 8.70833 14.7266 8.70833 15.5833V19.7083';
    return (
      <Svg width={w} height={h} viewBox="0 0 22 22" fill="none" accessibilityRole="image">
        <Defs>
          <LinearGradient
            id={gradId}
            x1="11.0018"
            y1="2.2921"
            x2="11.0009"
            y2="19.7083"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={Colors.goldStart} offset="0" />
            <Stop stopColor={Colors.goldMid} offset="0.5" />
            <Stop stopColor={Colors.goldEnd} offset="1" />
          </LinearGradient>
        </Defs>
        <Path d={pathRoof} fill={Colors.textWhite} />
        <Path d={pathRoof} fill={`url(#${gradId})`} />
        <Path d={pathDoor} fill={Colors.gold} />
        <Path d={pathDoor} fill={Colors.backgroundDark} />
      </Svg>
    );
  }

  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none" accessibilityRole="image">
      <Path d={HOME_INACTIVE_ROOF} fill={BLUE_SOFT} />
      <Path d={HOME_INACTIVE_DOOR} fill={BLUE_DEEP} />
    </Svg>
  );
}

const QURAN_INACTIVE_COVER =
  'M4 19.5V5.5C4 3.567 5.567 2 7.5 2H17.5C19.433 2 21 3.567 21 5.5V11.25V17';
const QURAN_INACTIVE_BOTTOM =
  'M21 17H6.5C5.11929 17 4 18.1193 4 19.5C4 20.8807 5.11929 22 6.5 22H21';
const QURAN_INACTIVE_TRIM =
  'M21 18.5C21.8284 18.5 22.5 17.8284 22.5 17C22.5 16.1716 21.8284 15.5 21 15.5V17V18.5ZM21 ' +
  '23.5C21.8284 23.5 22.5 22.8284 22.5 22C22.5 21.1716 21.8284 20.5 21 20.5V22V23.5ZM21 ' +
  '17V15.5H6.5V17V18.5H21V17ZM6.5 17V15.5C4.29086 15.5 2.5 17.2909 2.5 19.5H4H5.5C5.5 ' +
  '18.9477 5.94772 18.5 6.5 18.5V17ZM4 19.5H2.5C2.5 21.7091 4.29086 23.5 6.5 23.5V22V20.5C5.94772 ' +
  '20.5 5.5 20.0523 5.5 19.5H4ZM6.5 22V23.5H21V22V20.5H6.5V22Z';
const QURAN_INACTIVE_STAR =
  'M13.6716 6.67157L12.5 5.5L11.3284 6.67157H9.67157V8.32843L8.5 9.5L9.67157 10.6716V12.3284H11.3284L12.5 ' +
  '13.5L13.6716 12.3284H15.3284V10.6716L16.5 9.5L15.3284 8.32843V6.67157H13.6716Z';

/** Quran — Figma 24×24 inactive; 20×20 active (pill) */
export function TabQuranIcon({ size = 24, active = false }) {
  const w = size;
  const h = size;

  if (active) {
    const gradSpine = `quran-active-spine-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const gradStar = `quran-active-star-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const pathCover =
      'M3.33331 16.25V4.58334C3.33331 2.9725 4.63915 1.66667 6.24998 1.66667H14.5833C16.1941 ' +
      '1.66667 17.5 2.9725 17.5 4.58334V9.375V14.1667';
    const pathBottom =
      'M17.5 14.1667H5.41665C4.26605 14.1667 3.33331 15.0994 3.33331 16.25C3.33331 17.4006 ' +
      '4.26605 18.3333 5.41665 18.3333H17.5';
    const pathStar =
      'M11.393 5.55964L10.4166 4.58334L9.44031 5.55964H8.05962V6.94036L7.08331 7.91667L8.05962 ' +
      '8.893V10.2737H9.44031L10.4166 11.25L11.393 10.2737H12.7736V8.893L13.75 7.91667L12.7736 ' +
      '6.94036V5.55964H11.393Z';

    return (
      <Svg width={w} height={h} viewBox="0 0 20 20" fill="none" accessibilityRole="image">
        <Defs>
          <LinearGradient
            id={gradSpine}
            x1="10.4181"
            y1="14.1668"
            x2="10.418"
            y2="18.3333"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={Colors.goldStart} offset="0" />
            <Stop stopColor={Colors.goldMid} offset="0.5" />
            <Stop stopColor={Colors.goldEnd} offset="1" />
          </LinearGradient>
          <LinearGradient
            id={gradStar}
            x1="10.4173"
            y1="4.5835"
            x2="10.4169"
            y2="11.25"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={Colors.goldStart} offset="0" />
            <Stop stopColor={Colors.goldMid} offset="0.5" />
            <Stop stopColor={Colors.goldEnd} offset="1" />
          </LinearGradient>
        </Defs>
        <Path d={pathCover} fill={Colors.textWhite} />
        <Path d={pathBottom} fill={Colors.gold} />
        <Path d={pathBottom} fill={`url(#${gradSpine})`} />
        <Path d={pathStar} fill={Colors.gold} />
        <Path d={pathStar} fill={`url(#${gradStar})`} />
      </Svg>
    );
  }

  const maskId = `quran-trim-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none" accessibilityRole="image">
      <Defs>
        <Mask id={maskId} maskUnits="userSpaceOnUse">
          <Path d={QURAN_INACTIVE_BOTTOM} fill="#FFFFFF" />
        </Mask>
      </Defs>
      <Path d={QURAN_INACTIVE_COVER} fill={BLUE_SOFT} />
      <Path d={QURAN_INACTIVE_BOTTOM} fill={BLUE_DEEP} />
      <Path d={QURAN_INACTIVE_TRIM} fill={BLUE_SOFT} mask={`url(#${maskId})`} />
      <Path d={QURAN_INACTIVE_STAR} fill={BLUE_DEEP} />
    </Svg>
  );
}

/** Qibla — Figma 24×24 */
export function TabQiblaIcon({ size = 24, active: _active = false }) {
  const w = size;
  const h = size;
  const pathRing =
    'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z';
  const pathNeedle =
    'M13.6929 7.47664L10.9605 8.60175C10.1362 8.94115 9.72411 9.11084 9.41748 9.41748C9.11084 ' +
    '9.72411 8.94115 10.1362 8.60175 10.9605L7.47664 13.6929C6.63274 15.7424 6.21079 16.7671 ' +
    '6.72185 17.2782C7.2329 17.7892 8.25764 17.3673 10.3071 16.5234L13.0395 15.3982C13.8638 ' +
    '15.0589 14.2759 14.8892 14.5825 14.5825C14.8892 14.2759 15.0589 13.8638 15.3982 13.0395L16.5234 ' +
    '10.3071C17.3673 8.25764 17.7892 7.2329 17.2782 6.72185C16.7671 6.21079 15.7424 6.63274 13.6929 7.47664Z';
  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none" accessibilityRole="image">
      <Path
        d={pathRing}
        fill={BLUE_SOFT}
        stroke={BLUE_SOFT}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={pathNeedle}
        fill={BLUE_DEEP}
        stroke={BLUE_DEEP}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12V12.01"
        stroke={BLUE_SOFT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const DHIKR_ACTIVE_FROST = '#FDFDFF';

const DHIKR_INACTIVE_FILL =
  'M18.0104 7.98959L19.5 6.5L18.0104 7.98959ZM20.5 14C20.5 18.6944 16.6944 22.5 12 22.5C7.30558 ' +
  '22.5 3.5 18.6944 3.5 14C3.5 9.30558 7.30558 5.5 12 5.5C16.6944 5.5 20.5 9.30558 20.5 14Z';
const DHIKR_INACTIVE_STROKE_OUTER =
  'M18.0104 7.98959L19.5 6.5M20.5 14C20.5 18.6944 16.6944 22.5 12 22.5C7.30558 22.5 3.5 18.6944 ' +
  '3.5 14C3.5 9.30558 7.30558 5.5 12 5.5C16.6944 5.5 20.5 9.30558 20.5 14Z';
const DHIKR_INACTIVE_ARC =
  'M12 19.5C8.96243 19.5 6.5 17.0376 6.5 14C6.5 10.9624 8.96243 8.5 12 8.5';
const DHIKR_INACTIVE_TOP = 'M14.5 2.5H9.5';
const DHIKR_INACTIVE_HAND = 'M12 14L15.5 10.5';

/** Dhikr — viewBox 24×25 inactive; 20×21 active (pill) */
export function TabDhikrIcon({ size = 24, active = false }) {
  const w = size;
  const hInactive = Math.round((size * 25) / 24);

  if (active) {
    const h = Math.round((size * 21) / 20);
    const pathFill =
      'M15.0086 6.74132L16.25 5.5L15.0086 6.74132ZM17.0833 11.75C17.0833 15.662 13.912 18.8333 ' +
      '9.99996 18.8333C6.08794 18.8333 2.91663 15.662 2.91663 11.75C2.91663 7.83798 6.08794 4.66666 ' +
      '9.99996 4.66666C13.912 4.66666 17.0833 7.83798 17.0833 11.75Z';
    const pathStrokeOuter =
      'M15.0086 6.74132L16.25 5.5M17.0833 11.75C17.0833 15.662 13.912 18.8333 9.99996 18.8333' +
      'C6.08794 18.8333 2.91663 15.662 2.91663 11.75C2.91663 7.83798 6.08794 4.66666 9.99996 ' +
      '4.66666C13.912 4.66666 17.0833 7.83798 17.0833 11.75Z';
    const pathArc =
      'M9.99996 16.3333C7.46865 16.3333 5.41663 14.2813 5.41663 11.75C5.41663 9.21866 ' +
      '7.46865 7.16666 9.99996 7.16666';
    const pathTop = 'M12.0833 2.16667H7.91663';
    const pathHand = 'M10 11.75L12.9167 8.83334';

    return (
      <Svg width={w} height={h} viewBox="0 0 20 21" fill="none" accessibilityRole="image">
        <Path d={pathFill} fill={DHIKR_ACTIVE_FROST} />
        <Path
          d={pathStrokeOuter}
          stroke={DHIKR_ACTIVE_FROST}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={pathArc}
          stroke={Colors.gold}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={pathTop}
          stroke={Colors.gold}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={pathHand}
          stroke={Colors.gold}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg width={w} height={hInactive} viewBox="0 0 24 25" fill="none" accessibilityRole="image">
      <Path d={DHIKR_INACTIVE_FILL} fill={BLUE_SOFT} />
      <Path
        d={DHIKR_INACTIVE_STROKE_OUTER}
        stroke={BLUE_SOFT}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={DHIKR_INACTIVE_ARC}
        stroke={BLUE_DEEP}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={DHIKR_INACTIVE_TOP}
        stroke={BLUE_SOFT}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={DHIKR_INACTIVE_HAND}
        stroke={BLUE_DEEP}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

