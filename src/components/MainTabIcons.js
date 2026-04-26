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
    const gradId = `qibla-tab-active-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const pathRing =
      'M20.1667 11C20.1667 16.0626 16.0626 20.1667 11 20.1667C5.9374 20.1667 1.83334 16.0626 ' +
      '1.83334 11C1.83334 5.93738 5.9374 1.83333 11 1.83333C16.0626 1.83333 20.1667 5.93738 20.1667 11Z';
    const pathNeedle =
      'M12.5518 6.85359L10.0471 7.88495C9.29152 8.19606 8.91378 8.35161 8.6327 8.6327C8.35161 ' +
      '8.91378 8.19606 9.29152 7.88495 10.0471L6.85359 12.5518C6.08002 14.4305 5.69323 15.3698 ' +
      '6.1617 15.8384C6.63017 16.3068 7.56951 15.92 9.44818 15.1465L11.9529 14.115C12.7085 13.804 ' +
      '13.0862 13.6484 13.3673 13.3673C13.6484 13.0862 13.804 12.7085 14.115 11.9529L15.1465 9.44818' +
      'C15.92 7.56951 16.3068 6.63017 15.8384 6.1617C15.3698 5.69323 14.4305 6.08002 12.5518 6.85359Z';
    const pathPivot = 'M11 11V11.01';

    return (
      <Svg width={w} height={h} viewBox="0 0 22 22" fill="none" accessibilityRole="image">
        <Defs>
          <LinearGradient
            id={gradId}
            x1="11.0019"
            y1="1.83378"
            x2="11.0008"
            y2="20.1667"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={Colors.goldStart} offset="0" />
            <Stop stopColor={Colors.goldMid} offset="0.5" />
            <Stop stopColor={Colors.goldEnd} offset="1" />
          </LinearGradient>
        </Defs>
        <Path d={pathRing} fill={`url(#${gradId})`} />
        <Path d={pathNeedle} fill={Colors.backgroundDark} />
        <Path
          d={pathPivot}
          stroke={QIBLA_ACTIVE_CENTER_INK}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={pathPivot}
          stroke={Colors.gold}
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
    const gradId = `dhikr-tab-active-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const pathFill =
      'M15.0087 6.74128L16.2501 5.49996L15.0087 6.74128ZM17.0834 11.75C17.0834 15.662 13.9121 18.8333 ' +
      '10.0001 18.8333C6.08806 18.8333 2.91675 15.662 2.91675 11.75C2.91675 7.83794 6.08806 4.66663 ' +
      '10.0001 4.66663C13.9121 4.66663 17.0834 7.83794 17.0834 11.75Z';
    const pathStrokeOuter =
      'M15.0087 6.74128L16.2501 5.49996M17.0834 11.75C17.0834 15.662 13.9121 18.8333 10.0001 18.8333' +
      'C6.08806 18.8333 2.91675 15.662 2.91675 11.75C2.91675 7.83794 6.08806 4.66663 10.0001 ' +
      '4.66663C13.9121 4.66663 17.0834 7.83794 17.0834 11.75Z';
    const pathArc =
      'M10.0001 16.3333C7.46877 16.3333 5.41675 14.2813 5.41675 11.75C5.41675 9.21863 ' +
      '7.46877 7.16663 10.0001 7.16663';
    const pathTop = 'M12.0834 2.16663H7.91675';
    const pathHand = 'M10 11.75L12.9167 8.83337';

    return (
      <Svg width={w} height={h} viewBox="0 0 20 21" fill="none" accessibilityRole="image">
        <Defs>
          <LinearGradient
            id={gradId}
            x1="10.0015"
            y1="4.66697"
            x2="10.0007"
            y2="18.8333"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={Colors.goldStart} offset="0" />
            <Stop stopColor={Colors.goldMid} offset="0.5" />
            <Stop stopColor={Colors.goldEnd} offset="1" />
          </LinearGradient>
        </Defs>
        <Path d={pathFill} fill={`url(#${gradId})`} />
        <Path
          d={pathStrokeOuter}
          stroke={`url(#${gradId})`}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={pathArc}
          stroke={Colors.backgroundDark}
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
          stroke={Colors.backgroundDark}
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

