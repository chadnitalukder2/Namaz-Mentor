import React, { useId } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  RadialGradient as SvgRadialGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import { Colors, Fonts, Spacing } from '../constants/theme';
import MainTabBar from '../components/MainTabBar';
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
const NEEDLE_LEN = Math.round(COMPASS_INNER * 0.38);

/** Gold ring around compass — RN cannot use CSS `linear-gradient` as `borderColor`. */
const RING_GRADIENT = {
  colors: ['rgba(249, 201, 113, 1)', 'rgba(166, 130, 65, 1)', 'rgba(92, 60, 1, 1)'],
  locations: [0, 0.5, 1],
  start: { x: 0, y: 0.5 },
  end: { x: 1, y: 0.5 },
};

function CompassGlow() {
  const gid = `qg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const w = 400;
  const h = 380;
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      pointerEvents="none"
      style={StyleSheet.absoluteFillObject}
    >
      <Defs>
        <SvgRadialGradient id={gid} cx="50%" cy="42%" rx="55%" ry="48%">
          <Stop offset="0%" stopColor="rgba(225, 176, 78, 0.08)" />
          <Stop offset="55%" stopColor="rgba(6, 24, 47, 0.2)" />
          <Stop offset="100%" stopColor="rgba(1, 13, 29, 0)" />
        </SvgRadialGradient>
      </Defs>
      <Rect x={0} y={0} width={w} height={h} fill={`url(#${gid})`} />
    </Svg>
  );
}

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
              <LinearGradient
                colors={[FIGMA.gold, '#C9A050']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={compassStyles.needleNorth}
              />
              <View style={compassStyles.needleSouth} />
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
    width: 5,
    height: NEEDLE_LEN,
    marginLeft: -2.5,
    marginTop: -NEEDLE_LEN / 2,
    alignItems: 'center',
  },
  needleNorth: {
    width: 5,
    height: NEEDLE_LEN / 2,
    borderTopLeftRadius: 2.5,
    borderTopRightRadius: 2.5,
  },
  needleSouth: {
    width: 5,
    height: NEEDLE_LEN / 2,
    backgroundColor: 'rgba(142, 155, 174, 0.35)',
    borderBottomLeftRadius: 2.5,
    borderBottomRightRadius: 2.5,
  },
  kaabaOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: COMPASS_INNER * 0.28,
  },
});

export default function QiblaScreen({ navigation }) {
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
  const insets = useSafeAreaInsets();
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

        <View style={[styles.compassBlock, isShortScreen && styles.compassBlockShort]}>
          <CompassGlow />
          <QiblaCompass bearingDeg={bearingDeg} headingDeg={headingDeg} scale={compassScale} />
        </View>

        <View style={[styles.distanceBlock, isCompact && styles.distanceBlockCompact]}>
          <Ionicons name="arrow-up-outline" size={22} color={FIGMA.gold} style={styles.distanceArrow} />
          <View style={styles.distanceTextCol}>
            <Text style={styles.distanceLabel}>Distance to Makkah</Text>
            <Text style={[styles.distanceValue, isCompact && styles.distanceValueCompact]}>
              {formattedDistance} km
            </Text>
          </View>
        </View>

        <Text style={[styles.northHint, isShortScreen && styles.northHintShort]}>
          Point your device north for accurate reading
        </Text>
      </SafeAreaView>

      <View
        style={[
          styles.tabBarWrapper,
          { paddingBottom: Math.max(insets.bottom, Spacing.md) },
        ]}
      >
        <MainTabBar activeTab="qibla" navigation={navigation} />
      </View>
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
    paddingTop: 12,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
  compassBlock: {
    flex: 1,
    minHeight: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.md,
  },
  compassBlockShort: {
    marginVertical: Spacing.xs,
  },
  distanceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 340,
    paddingHorizontal: Spacing.xs,
  },
  distanceBlockCompact: {
    gap: 12,
  },
  distanceArrow: {
    transform: [{ rotate: '45deg' }],
  },
  distanceTextCol: {
    flex: 1,
  },
  distanceLabel: {
    ...Fonts.medium,
    fontSize: 15,
    color: Colors.textWhite,
  },
  distanceValue: {
    ...Fonts.bold,
    fontSize: 28,
    color: FIGMA.gold,
    marginTop: 4,
    fontVariant: ['tabular-nums'],
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
  tabBarWrapper: {
    backgroundColor: FIGMA.bg,
    paddingTop: Spacing.sm,
  },
});
