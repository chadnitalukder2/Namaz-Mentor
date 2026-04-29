import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { ClipPath, Defs, G, LinearGradient as SvgLinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Colors, Fonts, Spacing } from '../constants/theme';
import { useQibla } from '../hooks/usePrayerData';

/** Qibla — Figma https://www.figma.com/design/AFv20FFZyV3tJXlJBDMWLq/Namaz-Mentor-app--2?node-id=430-10944 (aligned to sibling 430-10881 where nodes match). */
const FIGMA = {
  bg: '#010D1D',
  gold: '#E1B04E',
  muted: '#8E9BAE',
  dial: '#0A1628',
};

const COMPASS_SIZE = 300;
const RING_BORDER = 3;
const COMPASS_INNER = COMPASS_SIZE - 2 * RING_BORDER;
const NEEDLE_ICON_WIDTH = 25;
const NEEDLE_ICON_HEIGHT = 87;

/** Gold ring around compass — RN cannot use CSS `linear-gradient` as `borderColor`. */
const RING_GRADIENT = {
  colors: ['rgba(249, 201, 113, 1)', 'rgba(166, 130, 65, 1)', 'rgba(92, 60, 1, 1)'],
  locations: [0, 0.5, 1],
  start: { x: 0, y: 0.5 },
  end: { x: 1, y: 0.5 },
};

function KaabaCenterMark({ size = 40 }) {
  const ink = '#141B34';
  const gold = '#D9AA55';
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel="Kaaba"
    >
      <Path
        d="M28 29.3334V6.66669C28 4.78107 28 3.83826 27.4143 3.25247C26.8284 2.66669 25.8856 2.66669 24 2.66669L8 2.66669C6.11439 2.66669 5.17157 2.66669 4.58579 3.25247C4 3.83826 4 4.78107 4 6.66669L4 29.3334"
        fill={ink}
      />
      <Path
        d="M28 29.3334V6.66669C28 4.78107 28 3.83826 27.4143 3.25247C26.8284 2.66669 25.8856 2.66669 24 2.66669L8 2.66669C6.11439 2.66669 5.17157 2.66669 4.58579 3.25247C4 3.83826 4 4.78107 4 6.66669L4 29.3334"
        stroke={ink}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.33325 22.6667C9.33325 21.4096 9.33325 20.7811 9.72377 20.3905C10.1143 20 10.7428 20 11.9999 20H13.3333C14.5903 20 15.2189 20 15.6094 20.3905C15.9999 20.7811 15.9999 21.4096 15.9999 22.6667V29.3333H9.33325V22.6667Z"
        stroke={gold}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.66675 29.3333H29.3334"
        stroke={ink}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 8L28 8"
        stroke={gold}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function DistancePointerIcon({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" accessibilityRole="image" accessibilityLabel="Distance icon">
      <G clipPath="url(#distanceIconClip)">
        <Path
          d="M2.5 9.16621L18.3326 1.66656L10.8329 17.4992L9.16635 10.8328L2.5 9.16621Z"
          fill="url(#distanceIconFill)"
        />
        <Path
          d="M2.5 9.16621L18.3326 1.66656L10.8329 17.4992L9.16635 10.8328L2.5 9.16621Z"
          stroke="#D9AA55"
          strokeWidth={1.66659}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.5 9.16621L18.3326 1.66656L10.8329 17.4992L9.16635 10.8328L2.5 9.16621Z"
          stroke="url(#distanceIconStroke)"
          strokeWidth={1.66659}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <SvgLinearGradient id="distanceIconFill" x1="10.4179" y1="1.66695" x2="10.417" y2="17.4992" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </SvgLinearGradient>
        <SvgLinearGradient id="distanceIconStroke" x1="10.4179" y1="1.66695" x2="10.417" y2="17.4992" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </SvgLinearGradient>
        <ClipPath id="distanceIconClip">
          <Rect width="19.9991" height="19.9991" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

function CompassNeedleIcon({ width = NEEDLE_ICON_WIDTH, height = NEEDLE_ICON_HEIGHT }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 87" fill="none" accessibilityRole="image" accessibilityLabel="Qibla needle">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.61621 1.57837C10.8162 -0.651518 14.0686 -0.483153 15.0322 1.85864L16.8936 6.3811C17.0006 6.6413 17.0699 6.91588 17.1006 7.19555L24.1943 71.802C24.1993 71.8476 24.2021 71.8935 24.2051 71.9387C24.4353 72.8522 24.5586 73.8069 24.5586 74.7893C24.5584 81.3826 19.061 86.7278 12.2793 86.7278C5.49761 86.7278 0.000203343 81.3826 0 74.7893C0 73.8601 0.108843 72.9553 0.31543 72.0872C0.316755 72.0029 0.320573 71.9178 0.329102 71.8323L6.76172 7.36938C6.80097 6.97603 6.91821 6.59447 7.10547 6.24633L9.61621 1.57837Z"
        fill="url(#compassNeedleGradient)"
      />
      <Defs>
        <SvgLinearGradient id="compassNeedleGradient" x1="12.2818" y1="0.00212237" x2="12.2647" y2="86.7278" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </SvgLinearGradient>
      </Defs>
    </Svg>
  );
}

function QiblaCompass({ bearingDeg, headingDeg, scale = 1 }) {
  const dialRotate = headingDeg != null ? -headingDeg : 0;

  return (
    <View style={[compassStyles.root, scale !== 1 && { transform: [{ scale }] }]}>
      <LinearGradient {...RING_GRADIENT} style={compassStyles.ringOuter}>
        <View style={compassStyles.ringInner}>
          <View style={[compassStyles.dial, { transform: [{ rotate: `${dialRotate}deg` }] }]}>
            <Text style={[compassStyles.cardinal, compassStyles.north]}>N</Text>
            <Text style={[compassStyles.cardinal, compassStyles.east]}>E</Text>
            <Text style={[compassStyles.cardinal, compassStyles.south]}>S</Text>
            <Text style={[compassStyles.cardinal, compassStyles.west]}>W</Text>

            <View style={[compassStyles.needlePivot, { transform: [{ rotate: `${bearingDeg}deg` }] }]}>
              <View style={compassStyles.needleIconWrap}>
                <CompassNeedleIcon />
              </View>
            </View>
          </View>

          <View style={compassStyles.kaabaOverlay} pointerEvents="none">
            <KaabaCenterMark size={44} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const compassStyles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringOuter: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    borderRadius: COMPASS_SIZE / 2,
    padding: RING_BORDER,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  ringInner: {
    width: COMPASS_INNER,
    height: COMPASS_INNER,
    borderRadius: COMPASS_INNER / 2,
    backgroundColor: 'rgba(23, 41, 64, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dial: {
    width: COMPASS_INNER - 4,
    height: COMPASS_INNER - 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardinal: {
    position: 'absolute',
    ...Fonts.bold,
    fontSize: 13,
    color: FIGMA.muted,
  },
  north: { top: 8 },
  south: { bottom: 8 },
  east: { right: 8 },
  west: { left: 8 },
  needlePivot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
    alignItems: 'center',
  },
  needleIconWrap: {
    position: 'absolute',
    left: -NEEDLE_ICON_WIDTH / 2,
    bottom: 0,
  },
  kaabaOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: COMPASS_INNER * 0.28,
  },
});

export default function QiblaScreen() {
  const {
    ready,
    locationLabel,
    bearingDeg,
    distanceKm,
    headingDeg,
    headingAvailable,
    turnHint,
  } = useQibla();
  const { width, height } = useWindowDimensions();
  const isCompact = width < 380;
  const isSmall = width < 340;
  const isShortScreen = height < 700;
  const compassScale = isSmall ? 0.76 : isCompact ? 0.88 : 1;
  const formattedDistance = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(distanceKm));

  const turnSecondLine = () => {
    if (!headingAvailable) return null;
    if (turnHint.turnSide === 'aligned') {
      return <Text style={styles.turnMuted}>Facing Qibla</Text>;
    }
    if (turnHint.turnSide === 'left' || turnHint.turnSide === 'right') {
      const w = turnHint.turnSide;
      return (
        <Text style={styles.turnLine}>
          Turn to your{' '}
          <Text style={styles.turnBold}>{w}</Text>
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={[styles.root, { minHeight: height }]}>
      <StatusBar barStyle="light-content" backgroundColor={FIGMA.bg} />

      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
        <View style={[styles.headerRow, isCompact && styles.headerRowCompact, isShortScreen && styles.headerRowShort]}>
          <View style={styles.headerLeft}>
            <Text style={styles.locationGold} numberOfLines={2}>
              {!ready ? 'Locating…' : locationLabel}
            </Text>
            <View style={styles.turnHintWrap}>
              {!ready ? (
                <ActivityIndicator size="small" color={FIGMA.gold} style={styles.locSpinner} />
              ) : (
                turnSecondLine()
              )}
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={[styles.degreeBig, isCompact && styles.degreeBigCompact]}>
              {Math.round(bearingDeg)}°
            </Text>
            <Text style={styles.toQiblaMuted}>to Qibla</Text>
          </View>
        </View>

        <View style={[styles.centerStack, isShortScreen && styles.centerStackShort]}>
          <View style={[styles.compassBlock, isShortScreen && styles.compassBlockShort]}>
            <QiblaCompass bearingDeg={bearingDeg} headingDeg={headingDeg} scale={compassScale} />
          </View>

          <View style={[styles.distanceBlock, isCompact && styles.distanceBlockCompact]}>
            <View style={styles.distanceTextCol}>
              <View style={styles.distanceLabelRow}>
                <DistancePointerIcon size={20} />
                <Text style={styles.distanceLabel}>Distance to Makkah</Text>
              </View>
              <Text style={[styles.distanceValue, isCompact && styles.distanceValueCompact]}>
                {formattedDistance} km
              </Text>
            </View>
          </View>

          <Text style={[styles.northHint, isShortScreen && styles.northHintShort]}>
            Point your device north for accurate reading
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: FIGMA.bg,
  },
  safe: {
    flex: 1,
    minHeight: 0,
    backgroundColor: FIGMA.bg,
    paddingHorizontal: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
    gap: 16,
  },
  headerRowCompact: {
    paddingHorizontal: 0,
  },
  headerRowShort: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  headerLeft: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  headerRight: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  locationGold: {
    ...Fonts.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: FIGMA.gold,
  },
  locSpinner: {
    alignSelf: 'flex-start',
  },
  turnHintWrap: {
    minHeight: 24,
    justifyContent: 'center',
    marginTop: 6,
  },
  turnLine: {
    ...Fonts.regular,
    fontSize: 15,
    color: Colors.textWhite,
    lineHeight: 22,
    flexShrink: 1,
  },
  turnBold: {
    ...Fonts.bold,
    color: Colors.textWhite,
  },
  turnMuted: {
    ...Fonts.regular,
    fontSize: 14,
    color: FIGMA.muted,
    flexShrink: 1,
  },
  degreeBig: {
    ...Fonts.bold,
    fontSize: 36,
    color: FIGMA.gold,
    fontVariant: ['tabular-nums'],
    letterSpacing: -0.5,
  },
  degreeBigCompact: {
    fontSize: 30,
  },
  toQiblaMuted: {
    ...Fonts.regular,
    fontSize: 12,
    color: FIGMA.muted,
    marginTop: 2,
  },
  centerStack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Spacing.xxxl,
  },
  centerStackShort: {
    justifyContent: 'flex-start',
    paddingTop: Spacing.sm,
  },
  compassBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  compassBlockShort: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  distanceBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 14,
    alignSelf: 'center',
    width: 'auto',
    marginTop: Spacing.xs,
  },
  distanceBlockCompact: {
    gap: 12,
  },
  distanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  distanceTextCol: {
    alignItems: 'center',
  },
  distanceLabel: {
    ...Fonts.medium,
    fontSize: 15,
    color: Colors.textWhite,
    textAlign: 'center',
  },
  distanceValue: {
    ...Fonts.bold,
    fontSize: 28,
    color: FIGMA.gold,
    marginTop: 4,
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
  distanceValueCompact: {
    fontSize: 24,
  },
  northHint: {
    ...Fonts.regular,
    fontSize: 12,
    color: FIGMA.muted,
    textAlign: 'center',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  northHintShort: {
    marginTop: Spacing.sm,
  },
});
