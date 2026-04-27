import React, { useId, useState } from 'react';
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
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { DHIKR_CATEGORIES } from '../constants/data';
import { TabDhikrIcon } from '../components/MainTabIcons';

const TARGET_PRESETS = [33, 99, 100, 1000];

const CATEGORY_VECTOR = {
  sun: { lib: 'mci', name: 'weather-sunset-up' },
  moon: { lib: 'mci', name: 'weather-night' },
  dua: { lib: 'mci', name: 'hands-pray' },
  sleep: { lib: 'mci', name: 'power-sleep' },
};

function CategoryListIcon({ iconKey, size = 22 }) {
  const spec = CATEGORY_VECTOR[iconKey] || CATEGORY_VECTOR.dua;
  const color = Colors.gold;
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
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const isSmall = width < 340;

  const ringGradId = `tasbih-ring-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

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

        <View style={styles.divider} />

        <ScrollView
          style={styles.libraryScroll}
          contentContainerStyle={styles.libraryScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionLabel}>LIBRARY</Text>
          <Text style={[styles.sectionTitle, isCompact && styles.sectionTitleCompact]}>Dhikr Library</Text>

          <View style={[styles.libraryList, isCompact && styles.libraryListCompact]}>
            {DHIKR_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.libraryItem, isCompact && styles.libraryItemCompact]}
                activeOpacity={0.72}
                onPress={() => navigation?.navigate('AdhkarDetail', { category: cat })}
              >
                <LinearGradient
                  colors={['rgba(249, 201, 113, 0.12)', 'rgba(23, 68, 108, 0.35)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.libraryIconBg, isCompact && styles.libraryIconBgCompact]}
                >
                  <CategoryListIcon iconKey={cat.icon} size={isCompact ? 20 : 22} />
                </LinearGradient>
                <View style={styles.libraryInfo}>
                  <Text style={[styles.libraryName, isCompact && styles.libraryNameCompact]} numberOfLines={1}>
                    {cat.name}
                  </Text>
                  <Text style={styles.libraryCount}>{cat.count} Adhkar</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
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
    paddingBottom: Spacing.xxl,
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
    height: 1,
    backgroundColor: Colors.separator,
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
    ...Fonts.bold,
    fontSize: 20,
    color: Colors.textWhite,
    marginBottom: Spacing.md,
  },
  sectionTitleCompact: {
    fontSize: 18,
    marginBottom: Spacing.sm + 4,
  },
  libraryList: {
    gap: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  libraryListCompact: {
    gap: Spacing.sm + 2,
  },
  libraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.separator,
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
  libraryInfo: { flex: 1 },
  libraryName: {
    ...Fonts.bold,
    fontSize: 16,
    color: Colors.textWhite,
  },
  libraryNameCompact: {
    fontSize: 15,
  },
  libraryCount: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
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
