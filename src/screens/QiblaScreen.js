import React, { useId } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
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
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import LocationPinIllustration from '../components/LocationPinIllustration';
import SettingsGearIllustration from '../components/SettingsGearIllustration';
import MainTabBar from '../components/MainTabBar';
import { useQibla } from '../hooks/usePrayerData';

const COMPASS_SIZE = 300;
const COMPASS_INNER = COMPASS_SIZE - 3;
const NEEDLE_LEN = Math.round(COMPASS_INNER * 0.38);

/** Soft halo behind compass (Figma-style vignette on dark sheet). */
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
          <Stop offset="0%" stopColor="rgba(18, 56, 89, 0.55)" />
          <Stop offset="45%" stopColor="rgba(6, 24, 47, 0.25)" />
          <Stop offset="100%" stopColor="rgba(2, 18, 38, 0)" />
        </SvgRadialGradient>
      </Defs>
      <Rect x={0} y={0} width={w} height={h} fill={`url(#${gid})`} />
    </Svg>
  );
}

/** Small Kaaba mark — vector, matches gold / dark Figma accents */
function KaabaCenterMark({ size = 40 }) {
  const gid = `k-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel="Kaaba"
    >
      <Defs>
        <SvgLinearGradient id={gid} x1="20" y1="8" x2="20" y2="34" gradientUnits="userSpaceOnUse">
          <Stop stopColor={Colors.goldStart} offset="0" />
          <Stop stopColor={Colors.goldMid} offset="0.5" />
          <Stop stopColor={Colors.goldEnd} offset="1" />
        </SvgLinearGradient>
      </Defs>
      <Path
        d="M10 16 L20 11 L30 16 L30 28 L20 33 L10 28 Z"
        fill={Colors.backgroundDark}
        stroke={`url(#${gid})`}
        strokeWidth={1.2}
      />
      <Path d="M20 11 L20 33" stroke={Colors.gold} strokeOpacity={0.35} strokeWidth={0.8} />
      <Path
        d="M14 20 H26"
        stroke={Colors.gold}
        strokeOpacity={0.55}
        strokeWidth={1}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function QiblaCompass({ bearingDeg, headingDeg, scale = 1 }) {
  const dialRotate = headingDeg != null ? -headingDeg : 0;
  const tickCount = 72;
  const r = COMPASS_INNER / 2 - 8;

  return (
    <View style={[compassStyles.root, scale !== 1 && { transform: [{ scale }] }]}>
      <LinearGradient
        colors={[Colors.goldStart, Colors.goldMid, Colors.goldEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[compassStyles.ringBorder, compassStyles.ringShadow]}
      >
        <View style={compassStyles.ringInner}>
          <View style={[compassStyles.dial, { transform: [{ rotate: `${dialRotate}deg` }] }]}>
            {Array.from({ length: tickCount }).map((_, i) => {
              const isMajor = i % 6 === 0;
              return (
                <View
                  key={i}
                  style={[
                    compassStyles.tick,
                    isMajor ? compassStyles.tickMajor : compassStyles.tickMinor,
                    {
                      transform: [{ rotate: `${i * 5}deg` }, { translateY: -r }],
                    },
                  ]}
                />
              );
            })}

            <Text style={[compassStyles.cardinal, compassStyles.north]}>N</Text>
            <Text style={[compassStyles.cardinal, compassStyles.east]}>E</Text>
            <Text style={[compassStyles.cardinal, compassStyles.south]}>S</Text>
            <Text style={[compassStyles.cardinal, compassStyles.west]}>W</Text>

            <View style={[compassStyles.needlePivot, { transform: [{ rotate: `${bearingDeg}deg` }] }]}>
              <LinearGradient
                colors={[Colors.goldStart, Colors.goldMid]}
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
    marginTop: Spacing.sm,
  },
  ringBorder: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    borderRadius: COMPASS_SIZE / 2,
    padding: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringShadow: {
    shadowColor: Colors.goldMid,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 14,
  },
  ringInner: {
    width: COMPASS_INNER,
    height: COMPASS_INNER,
    borderRadius: COMPASS_INNER / 2,
    backgroundColor: Colors.backgroundMedium,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    overflow: 'hidden',
  },
  dial: {
    width: COMPASS_INNER - 4,
    height: COMPASS_INNER - 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: {
    position: 'absolute',
    width: 2,
    borderRadius: 1,
    top: '50%',
    left: '50%',
    marginLeft: -1,
  },
  tickMinor: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  tickMajor: {
    height: 12,
    backgroundColor: 'rgba(217, 170, 85, 0.45)',
  },
  cardinal: {
    position: 'absolute',
    ...Fonts.bold,
    fontSize: 14,
  },
  north: {
    top: 6,
    color: Colors.gold,
  },
  south: {
    bottom: 6,
    color: Colors.textGrey,
  },
  east: {
    right: 6,
    color: Colors.textGrey,
  },
  west: {
    left: 6,
    color: Colors.textGrey,
  },
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
    backgroundColor: 'rgba(142, 143, 157, 0.45)',
    borderBottomLeftRadius: 2.5,
    borderBottomRightRadius: 2.5,
  },
  kaabaOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
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
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const isSmall = width < 340;
  const compassScale = isSmall ? 0.76 : isCompact ? 0.88 : 1;
  const compassStageMinHeight = Math.round(320 * compassScale) + 28;
  const formattedDistance = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(distanceKm));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundBlue} />

      <SafeAreaView style={styles.safeTop}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.screenTitle, isCompact && styles.screenTitleCompact]}>Qibla</Text>
            <Text style={styles.screenTagline}>Sacred direction</Text>
            <View style={[styles.locationPill, isCompact && styles.locationPillCompact]}>
              <LocationPinIllustration size={20} centerFill={Colors.backgroundBlue} />
              <Text style={styles.locationText} numberOfLines={1}>
                {!ready ? 'Locating…' : locationLabel}
              </Text>
              {!ready && <ActivityIndicator size="small" color={Colors.textGrey} style={styles.locSpinner} />}
            </View>
          </View>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation?.navigate('Settings')}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
          >
            <SettingsGearIllustration size={22} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, isCompact && styles.scrollContentCompact]}
          showsVerticalScrollIndicator={false}
          bounces
        >
          <View style={[styles.compassStage, { minHeight: compassStageMinHeight }, isCompact && styles.compassStageCompact]}>
            <CompassGlow />
            <QiblaCompass bearingDeg={bearingDeg} headingDeg={headingDeg} scale={compassScale} />
          </View>

          <View style={[styles.bearingBlock, isCompact && styles.bearingBlockCompact]}>
            <LinearGradient
              colors={[Colors.goldStart, Colors.goldMid, Colors.goldEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.degreeDegBorder}
            >
              <View style={[styles.degreeDegInner, isCompact && styles.degreeDegInnerCompact]}>
                <Text style={[styles.degreeValue, isCompact && styles.degreeValueCompact]}>
                  {Math.round(bearingDeg)}°
                </Text>
                <Text style={styles.degreeCaption}>to Qibla</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={[styles.hintPanel, isCompact && styles.hintPanelCompact]}>
            <View style={styles.hintIconCircle}>
              <Ionicons name={turnHint.ionicon} size={22} color={Colors.gold} />
            </View>
            <Text style={[styles.hintTitle, isCompact && styles.hintTitleCompact]}>{turnHint.line1}</Text>
            <Text style={[styles.hintSub, isCompact && styles.hintSubCompact]}>{turnHint.line2}</Text>
          </View>

          <View style={[styles.infoCard, isCompact && styles.infoCardCompact]}>
            <LinearGradient
              colors={['rgba(249, 201, 113, 0.18)', 'rgba(92, 60, 1, 0.08)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.infoCardGlow}
            />
            <View style={styles.infoCardRow}>
              <View style={styles.infoIconWrap}>
                <Ionicons name="map-outline" size={22} color={Colors.gold} />
              </View>
              <View style={styles.infoCardMid}>
                <Text style={styles.infoCardTitle}>Distance to Makkah</Text>
                <Text style={[styles.distanceKm, isCompact && styles.distanceKmCompact]}>
                  {formattedDistance} km
                </Text>
              </View>
            </View>
            <View style={styles.infoFoot}>
              <Ionicons
                name={headingAvailable ? 'compass-outline' : 'information-circle-outline'}
                size={18}
                color={Colors.textMuted}
              />
              <Text style={styles.infoFootText}>
                {headingAvailable
                  ? 'Hold the phone flat. Move away from metal or magnets for a stable reading.'
                  : 'Live compass is unavailable here — use the gold needle as a fixed bearing from north.'}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.tabBarWrapper}>
          <MainTabBar activeTab="qibla" navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  safeTop: {
    backgroundColor: Colors.backgroundBlue,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: Spacing.sm,
  },
  headerLeft: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  screenTitle: {
    ...Fonts.bold,
    fontSize: 28,
    color: Colors.textWhite,
    letterSpacing: -0.5,
  },
  screenTitleCompact: {
    fontSize: 24,
    letterSpacing: -0.3,
  },
  screenTagline: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textGrey,
    marginTop: 4,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(23, 68, 108, 0.55)',
    paddingVertical: 6,
    paddingRight: 14,
    paddingLeft: 8,
    borderRadius: Radius.round,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    maxWidth: '100%',
  },
  locationPillCompact: {
    marginTop: 10,
    paddingRight: 12,
  },
  locationText: {
    ...Fonts.semiBold,
    fontSize: 15,
    color: Colors.textWhite,
    flexShrink: 1,
  },
  locSpinner: {
    marginLeft: 4,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    marginTop: 4,
  },
  sheet: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.dotInactiveDark,
    alignSelf: 'center',
    marginBottom: Spacing.xs,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  scrollContentCompact: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  compassStage: {
    position: 'relative',
    minHeight: 320,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -Spacing.sm,
  },
  compassStageCompact: {
    marginHorizontal: 0,
  },
  bearingBlock: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  bearingBlockCompact: {
    marginTop: Spacing.md,
  },
  degreeDegBorder: {
    borderRadius: Radius.round,
    padding: 1.5,
    minWidth: 148,
  },
  degreeDegInner: {
    borderRadius: Radius.round - 1,
    backgroundColor: Colors.backgroundMedium,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  degreeDegInnerCompact: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  degreeValue: {
    ...Fonts.bold,
    fontSize: 30,
    color: Colors.textWarmCream,
    fontVariant: ['tabular-nums'],
  },
  degreeValueCompact: {
    fontSize: 26,
  },
  degreeCaption: {
    ...Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
    letterSpacing: 0.3,
  },
  hintPanel: {
    marginTop: Spacing.xl,
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  hintPanelCompact: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  hintIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(23, 68, 108, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(217, 170, 85, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  hintTitle: {
    ...Fonts.semiBold,
    fontSize: 17,
    color: Colors.textLight,
    textAlign: 'center',
  },
  hintTitleCompact: {
    fontSize: 16,
  },
  hintSub: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 8,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 320,
  },
  hintSubCompact: {
    fontSize: 13,
    lineHeight: 19,
  },
  infoCard: {
    marginTop: Spacing.xl,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: Colors.backgroundCard,
    overflow: 'hidden',
  },
  infoCardCompact: {
    marginTop: Spacing.lg,
  },
  infoCardGlow: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  infoCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  infoIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(2, 18, 38, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(217, 170, 85, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCardMid: {
    flex: 1,
  },
  infoCardTitle: {
    ...Fonts.medium,
    fontSize: 14,
    color: Colors.textGrey,
  },
  distanceKm: {
    ...Fonts.bold,
    fontSize: 26,
    color: Colors.textWhite,
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  distanceKmCompact: {
    fontSize: 22,
  },
  infoFoot: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  infoFootText: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    flex: 1,
    lineHeight: 19,
  },
  tabBarWrapper: {
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.sm,
  },
});
