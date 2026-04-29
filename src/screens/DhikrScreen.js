import React, { useId, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Path, Stop } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { DHIKR_CATEGORIES } from '../constants/data';
import { fetchHisnChapterItemCount } from '../services/adhkarApi';
import { TabDhikrIcon } from '../components/MainTabIcons';

const TARGET_PRESETS = [33, 99, 100, 1000];

const MORNING_SUN_CIRCLE_D =
  'M33.3295 24.9961C33.3295 29.5984 29.5985 33.3294 24.9962 33.3294C20.3938 33.3294 16.6628 29.5984 16.6628 24.9961C16.6628 20.3937 20.3938 16.6627 24.9962 16.6627C29.5985 16.6627 33.3295 20.3937 33.3295 24.9961Z';
const MORNING_SUN_RAYS_D =
  'M24.9886 9.99609H25.0036M24.9896 39.9961H25.0046M35.5941 14.3894H35.6091M14.3862 35.6028H14.4012M14.3862 14.3902H14.4012M35.5931 35.6036H35.6081M39.9811 24.9971H39.9961M9.99609 24.9971H10.0111';

function MorningSunListIcon({ size }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const paint0 = `${uid}_ms0`;
  const paint1 = `${uid}_ms1`;
  const muted = Colors.textMuted;

  return (
    <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <Defs>
        <SvgLinearGradient id={paint0} x1="24.9978" y1="16.6631" x2="24.9969" y2="33.3294" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </SvgLinearGradient>
        <SvgLinearGradient id={paint1} x1="24.9978" y1="16.6631" x2="24.9969" y2="33.3294" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </SvgLinearGradient>
      </Defs>
      <Path d={MORNING_SUN_CIRCLE_D} fill={muted} />
      <Path d={MORNING_SUN_CIRCLE_D} fill={`url(#${paint0})`} />
      <Path d={MORNING_SUN_CIRCLE_D} stroke={muted} strokeWidth={1.5} fill="none" />
      <Path d={MORNING_SUN_CIRCLE_D} stroke={`url(#${paint1})`} strokeWidth={1.5} fill="none" />
      <Path
        d={MORNING_SUN_RAYS_D}
        stroke={muted}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

const EVENING_MOON_D =
  'M36.0795 27.4209C34.6799 28.1681 33.0813 28.5918 31.3838 28.5918C25.8701 28.5918 21.4004 24.1221 21.4004 18.6084C21.4004 16.9109 21.8241 15.3123 22.5714 13.9127C17.6084 15.0759 13.9128 19.5304 13.9128 24.848C13.9128 31.0509 18.9413 36.0794 25.1442 36.0794C30.4619 36.0794 34.9163 32.3839 36.0795 27.4209Z';

function EveningMoonListIcon({ size }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const paint0 = `${uid}_ev0`;
  const paint1 = `${uid}_ev1`;

  return (
    <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <Defs>
        <SvgLinearGradient id={paint0} x1="24.9984" y1="13.9133" x2="24.9972" y2="36.0794" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </SvgLinearGradient>
        <SvgLinearGradient id={paint1} x1="24.9984" y1="13.9133" x2="24.9972" y2="36.0794" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#F9C971" />
          <Stop offset="0.5" stopColor="#A68241" />
          <Stop offset="1" stopColor="#5C3C01" />
        </SvgLinearGradient>
      </Defs>
      <Path
        d={EVENING_MOON_D}
        fill={`url(#${paint0})`}
        stroke={`url(#${paint1})`}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const AFTER_SALAH_HAND_R_D =
  'M31.9961 25.9961L31.3378 25.3378C30.5857 24.5857 29.3764 24.5539 28.5857 25.2655L25.9892 27.6023C25.3571 28.1712 24.9961 28.9817 24.9961 29.8322V33.9961H27.6826C28.5199 33.9961 29.3191 33.6462 29.887 33.0309L34.2005 28.358C34.712 27.8038 34.9961 27.0773 34.9961 26.3231V18.9961H33.9961C32.8915 18.9961 31.9961 19.8915 31.9961 20.9961V25.9961ZM31.9961 25.9961L28.9961 28.9961L31.9961 25.9961Z';
const AFTER_SALAH_HAND_L_D =
  'M17.9961 25.9961L18.6544 25.3378C19.4065 24.5857 20.6158 24.5539 21.4065 25.2655L24.003 27.6023C24.6351 28.1712 24.9961 28.9817 24.9961 29.8322V33.9961H22.3096C21.4723 33.9961 20.6731 33.6462 20.1052 33.0309L15.7917 28.358C15.2801 27.8038 14.9961 27.0773 14.9961 26.3231V18.9961H15.9961C17.1007 18.9961 17.9961 19.8915 17.9961 20.9961V25.9961ZM17.9961 25.9961L20.9961 28.9961L17.9961 25.9961Z';
const AFTER_SALAH_ARC_D =
  'M27.9961 20.4304C27.4308 21.3686 26.4021 21.9961 25.2269 21.9961C23.4426 21.9961 21.9961 20.5496 21.9961 18.7653C21.9961 17.5901 22.6236 16.5614 23.5618 15.9961';
const AFTER_SALAH_DOT_D = 'M26.9961 16.9961H27.0051';

const BEFORE_SLEEP_MOON_D =
  'M30.4961 30.9961C30.2089 30.2369 29.9524 29.1336 28.9961 28.4961C27.4961 27.4961 25.9961 26.9961 25.9961 25.4961C25.9961 23.9961 25.4961 20.9961 25.4961 20.9961L26.1916 20.2641C27.8896 21.0207 29.4961 18.8768 29.4961 17.4961C29.4961 16.1154 28.3768 14.9961 26.9961 14.9961C25.6154 14.9961 24.4961 16.1154 24.4961 17.4961C24.4961 18.4961 23.6961 19.0961 22.4961 19.4961C20.9961 19.9961 18.9961 20.9961 18.9961 25.9961C18.9961 29.9961 20.8294 31.3294 21.4961 31.9961C18.2961 31.9961 17.4961 33.9961 17.4961 34.9961H30.4961C31.6007 34.9961 32.4961 34.1007 32.4961 32.9961C32.4961 31.8915 31.6007 30.9961 30.4961 30.9961ZM30.4961 30.9961C22.768 30.9961 22.056 26.3294 22.4961 23.9961';

/** Same vertical gold ramp as morning sun / evening moon (50×50 artboard). */
const CATEGORY_GOLD_GRAD = {
  x1: '24.9984',
  y1: '13.9133',
  x2: '24.9972',
  y2: '36.0794',
};

function CategoryGoldGradientDefs({ gradId }) {
  return (
    <SvgLinearGradient id={gradId} x1={CATEGORY_GOLD_GRAD.x1} y1={CATEGORY_GOLD_GRAD.y1} x2={CATEGORY_GOLD_GRAD.x2} y2={CATEGORY_GOLD_GRAD.y2} gradientUnits="userSpaceOnUse">
      <Stop offset="0" stopColor={Colors.goldStart} />
      <Stop offset="0.5" stopColor={Colors.goldMid} />
      <Stop offset="1" stopColor={Colors.goldEnd} />
    </SvgLinearGradient>
  );
}

function AfterSalahListIcon({ size }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const gradId = `${uid}_asg`;
  const goldUrl = `url(#${gradId})`;

  return (
    <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <Defs>
        <CategoryGoldGradientDefs gradId={gradId} />
      </Defs>
      <Path d={AFTER_SALAH_HAND_R_D} fill={goldUrl} />
      <Path d={AFTER_SALAH_HAND_L_D} fill={goldUrl} />
      <Path d={AFTER_SALAH_ARC_D} stroke={goldUrl} strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <Path
        d={AFTER_SALAH_DOT_D}
        stroke={goldUrl}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function BeforeSleepListIcon({ size }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const gradId = `${uid}_slg`;
  const goldUrl = `url(#${gradId})`;

  return (
    <Svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <Defs>
        <CategoryGoldGradientDefs gradId={gradId} />
      </Defs>
      <Path
        d={BEFORE_SLEEP_MOON_D}
        stroke={goldUrl}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function usesPlainLibraryIconSlot(iconKey) {
  return (
    iconKey === 'morning' ||
    iconKey === 'sun' ||
    iconKey === 'evening' ||
    iconKey === 'moon' ||
    iconKey === 'afterSalah' ||
    iconKey === 'dua' ||
    iconKey === 'sleep' ||
    iconKey === 'beforeSleep'
  );
}

const CATEGORY_VECTOR = {
  sun: { lib: 'custom', render: 'morningSun' },
  morning: { lib: 'custom', render: 'morningSun' },
  moon: { lib: 'custom', render: 'eveningMoon' },
  evening: { lib: 'custom', render: 'eveningMoon' },
  afterSalah: { lib: 'custom', render: 'afterSalah' },
  dua: { lib: 'custom', render: 'afterSalah' },
  sleep: { lib: 'custom', render: 'beforeSleep' },
  beforeSleep: { lib: 'custom', render: 'beforeSleep' },
};

const CATEGORY_ICON_FALLBACK = { lib: 'mci', name: 'hands-pray' };

function CategoryListIcon({ iconKey, size = 50 }) {
  const spec = CATEGORY_VECTOR[iconKey] || CATEGORY_ICON_FALLBACK;
  const color = Colors.gold;
  if (spec.lib === 'custom' && spec.render === 'morningSun') {
    return <MorningSunListIcon size={size} />;
  }
  if (spec.lib === 'custom' && spec.render === 'eveningMoon') {
    return <EveningMoonListIcon size={size} />;
  }
  if (spec.lib === 'custom' && spec.render === 'afterSalah') {
    return <AfterSalahListIcon size={size} />;
  }
  if (spec.lib === 'custom' && spec.render === 'beforeSleep') {
    return <BeforeSleepListIcon size={size} />;
  }
  if (spec.lib === 'mci') {
    return <MaterialCommunityIcons name={spec.name} size={size} color={color} />;
  }
  return <Ionicons name="ellipse-outline" size={size} color={color} />;
}

function TasbihProgressRing({ size, progress, strokeWidth, gradId }) {
  const r = (size - strokeWidth) / 2 - 1;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <Svg width={size} height={size} style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Defs>
        <SvgLinearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0" stopColor={Colors.goldStart} />
          <Stop offset="0.5" stopColor={Colors.goldMid} />
          <Stop offset="1" stopColor={Colors.goldEnd} />
        </SvgLinearGradient>
      </Defs>
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={Colors.backgroundCard}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </Svg>
  );
}

const TasbihCounter = ({ count, target, onPress, onReset, onSetTarget, isCompact, isSmall, ringGradId }) => {
  const progress = Math.min(count / target, 1);
  const isComplete = count >= target;
  const circleSize = isSmall ? 168 : isCompact ? 188 : 208;
  const ringPad = 10;
  const innerSize = circleSize - ringPad * 2;
  const countFontSize = isSmall ? 52 : isCompact ? 62 : 72;
  const countLineHeight = countFontSize + 6;
  const strokeWidth = isSmall ? 5 : 6;

  return (
    <View style={counterStyles.wrapper}>
      <Text style={[styles.pageTitle, isCompact && styles.pageTitleCompact]}>Digital Tasbih</Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.88}
        accessibilityRole="button"
        accessibilityLabel="Increment dhikr count"
      >
        <LinearGradient
          colors={
            isComplete
              ? [Colors.goldStart, Colors.goldMid, Colors.goldEnd]
              : [Colors.backgroundCard, Colors.backgroundBlue, Colors.backgroundCard]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            counterStyles.gradientFrame,
            {
              width: circleSize + 6,
              height: circleSize + 6,
              borderRadius: (circleSize + 6) / 2,
            },
          ]}
        >
          <View
            style={[
              counterStyles.innerPlate,
              {
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
              },
            ]}
          >
            <View style={{ width: innerSize, height: innerSize, alignItems: 'center', justifyContent: 'center' }}>
              <TasbihProgressRing
                size={innerSize}
                progress={progress}
                strokeWidth={strokeWidth}
                gradId={ringGradId}
              />
              <Text
                style={[
                  counterStyles.countText,
                  { fontSize: countFontSize, lineHeight: countLineHeight },
                  isComplete && counterStyles.countTextComplete,
                ]}
              >
                {count}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={counterStyles.target}>
        Target: <Text style={counterStyles.targetValue}>{target}</Text>
      </Text>

      <View style={[counterStyles.btnRow, isSmall && counterStyles.btnRowSmall]}>
        <TouchableOpacity
          style={[counterStyles.resetBtn, isCompact && counterStyles.resetBtnCompact, isSmall && counterStyles.resetBtnSmall]}
          onPress={onReset}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="restore" size={16} color={'rgba(142, 143, 157, 1)'} />
          <Text style={counterStyles.resetText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={counterStyles.settingsBtn} onPress={onSetTarget} activeOpacity={0.85}>
          <Ionicons name="options-outline" size={22} color={'rgba(16, 14, 29, 1)'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const counterStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md + 4,
    backgroundColor: 'rgba(6, 24, 47, 1)',
    borderRadius: Radius.l,
  },
  gradientFrame: {
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerPlate: {
    backgroundColor: Colors.backgroundMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    ...Fonts.bold,
    color: Colors.textWhite,
    textAlign: 'center',
  },
  countTextComplete: {
    color: Colors.textWarmCream,
  },
  target: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
  },
  targetValue: {
    ...Fonts.semiBold,
    color: Colors.textGrey,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  btnRowSmall: {
    width: '100%',
    justifyContent: 'center',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(2, 18, 38, 1)',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: Radius.round,
    minWidth: 200,
    justifyContent: 'center',
  },
  resetBtnCompact: {
    minWidth: 136,
    paddingVertical: 10,
  },
  resetBtnSmall: {
    minWidth: 128,
  },
  resetText: {
    ...Fonts.medium,
    fontSize: 15,
    color: 'rgba(142, 143, 157, 1)',
  },
  settingsBtn: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(63, 84, 112, 1)',
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function DhikrScreen({ navigation }) {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [targetModal, setTargetModal] = useState(false);
  const [adhkarCountsByCategoryId, setAdhkarCountsByCategoryId] = useState({});
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const isSmall = width < 340;

  const ringGradId = `tasbih-ring-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const chapterIds = [
        ...new Set(
          DHIKR_CATEGORIES.map((c) => c.hisnEnChapterId).filter((id) => id != null && Number.isFinite(Number(id)))
        ),
      ];
      const countByChapter = new Map();
      await Promise.all(
        chapterIds.map(async (chapterId) => {
          const n = await fetchHisnChapterItemCount(chapterId);
          if (!cancelled && n != null) countByChapter.set(chapterId, n);
        })
      );
      if (cancelled) return;
      const next = {};
      for (const cat of DHIKR_CATEGORIES) {
        const n = countByChapter.get(cat.hisnEnChapterId);
        if (n != null) next[cat.id] = n;
      }
      setAdhkarCountsByCategoryId(next);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.tasbihFixed}>
          <TasbihCounter
            count={count}
            target={target}
            onPress={() => setCount((c) => c + 1)}
            onReset={() => setCount(0)}
            onSetTarget={() => setTargetModal(true)}
            isCompact={isCompact}
            isSmall={isSmall}
            ringGradId={ringGradId}
          />
        </View>

        <View style={styles.divider} 
        >
          <Text style={[styles.sectionTitle, isCompact && styles.sectionTitleCompact]}>Dhikr Library</Text>
        </View>

        <ScrollView
          style={styles.libraryScroll}
          contentContainerStyle={styles.libraryScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        

          <View style={[styles.libraryList, isCompact && styles.libraryListCompact]}>
            {DHIKR_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.libraryItem, isCompact && styles.libraryItemCompact]}
                activeOpacity={0.72}
                onPress={() => navigation?.navigate('AdhkarDetail', { category: cat })}
              >
                {usesPlainLibraryIconSlot(cat.icon) ? (
                  <View style={[styles.libraryIconPlain, isCompact && styles.libraryIconPlainCompact]}>
                    <CategoryListIcon iconKey={cat.icon} size={isCompact ? 28 : 50} />
                  </View>
                ) : (
                  <LinearGradient
                    colors={['rgba(249, 201, 113, 0.12)', 'rgba(23, 68, 108, 0.35)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.libraryIconBg, isCompact && styles.libraryIconBgCompact]}
                  >
                    <CategoryListIcon iconKey={cat.icon} size={isCompact ? 20 : 22} />
                  </LinearGradient>
                )}
                <View style={styles.libraryInfo}>
                  <Text style={[styles.libraryName, isCompact && styles.libraryNameCompact]} numberOfLines={1}>
                    {cat.name}
                  </Text>
                  <Text style={styles.libraryCount}>
                    {adhkarCountsByCategoryId[cat.id] ?? cat.count} Adhkar
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={'rgba(217, 170, 85, 1)'} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={targetModal}
        transparent
        animationType="fade"
        onRequestClose={() => setTargetModal(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setTargetModal(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Set target</Text>
            <Text style={styles.modalHint}>Choose how many counts to complete one round.</Text>
            <View style={styles.modalTargets}>
              {TARGET_PRESETS.map((n) => (
                <TouchableOpacity
                  key={n}
                  style={[styles.modalChip, target === n && styles.modalChipActive]}
                  onPress={() => {
                    setTarget(n);
                    setCount(0);
                    setTargetModal(false);
                  }}
                >
                  <Text style={[styles.modalChipText, target === n && styles.modalChipTextActive]}>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.modalClose} onPress={() => setTargetModal(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Spacing.sm,
  },
  tasbihFixed: {
    flexShrink: 0,
  },
  libraryScroll: {
    flex: 1,
    minHeight: 0,
  },
  libraryScrollContent: {
    flexGrow: 1,
  },
  heroHeader: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  heroHeaderCompact: {
    marginBottom: 4,
  },
  heroIconHalo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  heroIconInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.backgroundMedium,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  pageTitle: {
    ...Fonts.semiBold,
    fontSize: 18,
    color: 'rgba(255, 243, 223, 1)',
    textAlign: 'center',
  },
  pageTitleCompact: {
    fontSize: 20,
  },
  pageSubtitle: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: Spacing.lg,
  },
  divider: {
    marginVertical: Spacing.md,
  },
  sectionLabel: {
    ...Fonts.semiBold,
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  sectionTitle: {
    ...Fonts.medium,
    fontSize: 18,
    color: 'rgba(245, 247, 250, 1)',
  },
  sectionTitleCompact: {
    fontSize: 18,
    marginBottom: Spacing.sm + 4,
  },
  libraryList: {
    gap: 12,
    paddingBottom: Spacing.md,
    borderRadius: '14px',
  },
  libraryListCompact: {
    gap: Spacing.sm + 2,
  },
  libraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 24, 47, 1)',
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  libraryItemCompact: {
    padding: Spacing.sm + 6,
    gap: Spacing.sm + 4,
  },
  libraryIconBg: {
    width: 52,
    height: 52,
    borderRadius: Radius.sm + 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(217, 170, 85, 0.25)',
  },
  libraryIconBgCompact: {
    width: 46,
    height: 46,
    borderRadius: Radius.md,
  },
  libraryIconPlain: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  libraryIconPlainCompact: {
    width: 46,
    height: 46,
  },
  libraryInfo: { flex: 1 },
  libraryName: {
    ...Fonts.semiBold,
    fontSize: 16,
    color: 'rgba(245, 247, 250, 1)',
  },
  libraryNameCompact: {
    fontSize: 15,
  },
  libraryCount: {
    ...Fonts.regular,
    fontSize: 13,
    color: 'rgba(166, 150, 119, 1)',
    marginTop: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 18, 38, 0.72)',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  modalCard: {
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  modalTitle: {
    ...Fonts.bold,
    fontSize: 18,
    color: Colors.textWhite,
    marginBottom: 6,
  },
  modalHint: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  modalTargets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  modalChip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: Radius.pill,
    backgroundColor: Colors.backgroundDark,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  modalChipActive: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(217, 170, 85, 0.12)',
  },
  modalChipText: {
    ...Fonts.semiBold,
    fontSize: 16,
    color: Colors.textGrey,
  },
  modalChipTextActive: {
    color: Colors.gold,
  },
  modalClose: {
    marginTop: Spacing.md,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  modalCloseText: {
    ...Fonts.medium,
    fontSize: 15,
    color: Colors.textMuted,
  },
});
