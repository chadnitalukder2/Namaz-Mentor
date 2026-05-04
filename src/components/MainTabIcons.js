import React, { useId } from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { Colors } from '../constants/theme';

const HOME_INACTIVE_ROOF =
  'M12.818 2.57569L20.6969 8.79587C20.9935 9.03006 21.1666 9.38714 21.1666 9.76508C21.1666 ' +
  '10.4472 20.6137 11 19.9317 11H19.3333V14.2083C19.3333 16.801 19.3333 18.0974 18.5278 ' +
  '18.9029C17.7223 19.7083 16.426 19.7083 13.8333 19.7083H10.1666C7.57386 19.7083 6.2775 ' +
  '19.7083 5.47204 18.9029C4.66659 18.0974 4.66659 16.801 4.66659 14.2083V11H4.06815C3.38614 ' +
  '11 2.83325 10.4472 2.83325 9.76508C2.83325 9.38714 3.00632 9.03006 3.30295 8.79587L11.1819 ' +
  '2.57569C11.4148 2.39174 11.703 2.29169 11.9999 2.29169C12.2968 2.29169 12.585 2.39174 12.818 2.57569Z';

const HOME_INACTIVE_DOOR =
  'M14.2916 19.7084V15.5834C14.2916 14.7266 14.2916 14.2983 14.1073 13.9792C13.9867 ' +
  '13.7702 13.8131 13.5966 13.6041 13.4759C13.285 13.2917 12.8566 13.2917 11.9999 13.2917C11.1432 ' +
  '13.2917 10.7148 13.2917 10.3958 13.4759C10.1868 13.5966 10.0131 13.7702 9.89247 ' +
  '13.9792C9.70825 14.2983 9.70825 14.7266 9.70825 15.5834V19.7084';

/** Home — Figma 24×24 inactive; 22×22 active (pill) */
export function TabHomeIcon({ size = 24, active = false }) {
  const w = size;
  const h = size;

  if (active) {
    const gradId = `home-tab-active-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const pathRoof =
      'M11.818 2.57566L19.6969 8.79584C19.9935 9.03003 20.1666 9.38711 20.1666 9.76505C20.1666 ' +
      '10.4471 19.6137 11 18.9317 11H18.3333V14.2083C18.3333 16.801 18.3333 18.0974 17.5278 ' +
      '18.9028C16.7223 19.7083 15.426 19.7083 12.8333 19.7083H9.16659C6.57386 19.7083 5.2775 ' +
      '19.7083 4.47204 18.9028C3.66659 18.0974 3.66659 16.801 3.66659 14.2083V11H3.06815' +
      'C2.38614 11 1.83325 10.4471 1.83325 9.76505C1.83325 9.38711 2.00632 9.03003 2.30295 ' +
      '8.79584L10.1819 2.57566C10.4148 2.39171 10.703 2.29166 10.9999 2.29166C11.2968 2.29166 11.585 ' +
      '2.39171 11.818 2.57566Z';
    const pathDoor =
      'M13.2916 19.7083V15.5833C13.2916 14.7266 13.2916 14.2982 13.1073 13.9792C12.9867 ' +
      '13.7702 12.8131 13.5965 12.6041 13.4759C12.285 13.2917 11.8566 13.2917 10.9999 13.2917' +
      'C10.1432 13.2917 9.71484 13.2917 9.39575 13.4759C9.18675 13.5965 9.01314 13.7702 ' +
      '8.89247 13.9792C8.70825 14.2982 8.70825 14.7266 8.70825 15.5833V19.7083';
    return (
      <Svg width={w} height={h} viewBox="0 0 22 22" fill="none" accessibilityRole="image">
        <Defs>
          <LinearGradient
            id={gradId}
            x1="11.0004"
            y1="13.2918"
            x2="10.9999"
            y2="19.7083"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={Colors.goldStart} offset="0" />
            <Stop stopColor={Colors.goldMid} offset="0.5" />
            <Stop stopColor={Colors.goldEnd} offset="1" />
          </LinearGradient>
        </Defs>
        <Path d={pathRoof} fill={Colors.textWhite} />
        <Path d={pathDoor} fill={Colors.gold} />
        <Path d={pathDoor} fill={`url(#${gradId})`} />
      </Svg>
    );
  }

  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none" accessibilityRole="image">
      <Path d={HOME_INACTIVE_ROOF} fill={Colors.textMuted} />
      <Path d={HOME_INACTIVE_DOOR} fill={Colors.textWhite} />
    </Svg>
  );
}

/** Quran inactive — 24×24 (grey cover, light bottom, white star) */
const QURAN_INACTIVE_COVER =
  'M4 19.5V5.5C4 3.567 5.567 2 7.5 2H17.5C19.433 2 21 3.567 21 5.5V11.25V17';
const QURAN_INACTIVE_BOTTOM =
  'M21 17H6.5C5.11929 17 4 18.1193 4 19.5C4 20.8807 5.11929 22 6.5 22H21';
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

  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none" accessibilityRole="image">
      <Path d={QURAN_INACTIVE_COVER} fill={Colors.textPrayerName} />
      <Path d={QURAN_INACTIVE_BOTTOM} fill={Colors.textLight} />
      <Path d={QURAN_INACTIVE_STAR} fill={Colors.textWhite} />
    </Svg>
  );
}

const QIBLA_INACTIVE_RING =
  'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z';
const QIBLA_INACTIVE_NEEDLE =
  'M13.6929 7.47664L10.9605 8.60175C10.1362 8.94115 9.72411 9.11084 9.41748 9.41748C9.11084 ' +
  '9.72411 8.94115 10.1362 8.60175 10.9605L7.47664 13.6929C6.63274 15.7424 6.21079 16.7671 ' +
  '6.72185 17.2782C7.2329 17.7892 8.25764 17.3673 10.3071 16.5234L13.0395 15.3982C13.8638 ' +
  '15.0589 14.2759 14.8892 14.5825 14.5825C14.8892 14.2759 15.0589 13.8638 15.3982 13.0395L16.5234 ' +
  '10.3071C17.3673 8.25764 17.7892 7.2329 17.2782 6.72185C16.7671 6.21079 15.7424 6.63274 13.6929 7.47664Z';
/** Inactive needle fill + stroke (Figma) */
const QIBLA_INACTIVE_NEEDLE_TONE = '#D9D9D9';

const QIBLA_ACTIVE_CENTER_INK = '#141B34';

/** Qibla — Figma 24×24 inactive; 22×22 active (pill) */
export function TabQiblaIcon({ size = 24, active = false }) {
  const w = size;
  const h = size;

  if (active) {
    const pathRing =
      'M20.1666 11C20.1666 16.0626 16.0625 20.1667 10.9999 20.1667C5.93731 20.1667 1.83325 16.0626 ' +
      '1.83325 11C1.83325 5.93738 5.93731 1.83333 10.9999 1.83333C16.0625 1.83333 20.1666 5.93738 20.1666 11Z';
    const pathNeedle =
      'M12.5517 6.85359L10.047 7.88495C9.29143 8.19606 8.91368 8.35161 8.63261 8.6327C8.35152 ' +
      '8.91378 8.19597 9.29152 7.88485 10.0471L6.8535 12.5518C6.07993 14.4305 5.69314 15.3698 ' +
      '6.16161 15.8384C6.63007 16.3068 7.56942 15.92 9.44809 15.1465L11.9528 14.115C12.7084 13.804 ' +
      '13.0862 13.6484 13.3672 13.3673C13.6483 13.0862 13.8039 12.7085 14.1149 11.9529L15.1464 9.44818' +
      'C15.9199 7.56951 16.3067 6.63017 15.8383 6.1617C15.3698 5.69323 14.4304 6.08002 12.5517 6.85359Z';
    const pathPivot = 'M11 11V11.01';

    return (
      <Svg width={w} height={h} viewBox="0 0 22 22" fill="none" accessibilityRole="image">
        <Path
          d={pathRing}
          fill={Colors.textWhite}
          stroke={Colors.textWhite}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={pathNeedle}
          fill={Colors.gold}
          stroke={Colors.gold}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={pathPivot}
          stroke={QIBLA_ACTIVE_CENTER_INK}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none" accessibilityRole="image">
      <Path
        d={QIBLA_INACTIVE_RING}
        fill={Colors.textPrayerName}
        stroke={Colors.textPrayerName}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={QIBLA_INACTIVE_NEEDLE}
        fill={QIBLA_INACTIVE_NEEDLE_TONE}
        stroke={QIBLA_INACTIVE_NEEDLE_TONE}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12V12.01"
        stroke={QIBLA_ACTIVE_CENTER_INK}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

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
      'M16.0087 7.74132L17.2501 6.5L16.0087 7.74132ZM18.0834 12.75C18.0834 16.662 14.9121 19.8333 ' +
      '11.0001 19.8333C7.08806 19.8333 3.91675 16.662 3.91675 12.75C3.91675 8.83798 7.08806 5.66666 ' +
      '11.0001 5.66666C14.9121 5.66666 18.0834 8.83798 18.0834 12.75Z';
    const pathStrokeOuter =
      'M16.0087 7.74132L17.2501 6.5M18.0834 12.75C18.0834 16.662 14.9121 19.8333 11.0001 19.8333' +
      'C7.08806 19.8333 3.91675 16.662 3.91675 12.75C3.91675 8.83798 7.08806 5.66666 11.0001 ' +
      '5.66666C14.9121 5.66666 18.0834 8.83798 18.0834 12.75Z';
    const pathArc =
      'M11.0001 17.3333C8.46877 17.3333 6.41675 15.2813 6.41675 12.75C6.41675 10.2187 ' +
      '8.46877 8.16666 11.0001 8.16666';
    const pathTop = 'M13.0834 3.16667H8.91675';
    const pathHand = 'M11 12.75L13.9167 9.83334';

    return (
      <Svg width={w} height={h} viewBox="0 0 20 21" fill="none" accessibilityRole="image">
        <Path d={pathFill} fill={Colors.textWhite} />
        <Path
          d={pathStrokeOuter}
          stroke={Colors.textWhite}
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
      <Path d={DHIKR_INACTIVE_FILL} fill={Colors.textPrayerName} />
      <Path
        d={DHIKR_INACTIVE_STROKE_OUTER}
        stroke={Colors.textPrayerName}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={DHIKR_INACTIVE_ARC}
        stroke={Colors.textWhite}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={DHIKR_INACTIVE_TOP}
        stroke={Colors.textWhite}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d={DHIKR_INACTIVE_HAND}
        stroke={Colors.textWhite}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

