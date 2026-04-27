import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { DHIKR_CATEGORIES } from '../constants/data';
// ─── Circular Counter ─────────────────────────────────────────────
const TasbihCounter = ({ count, target, onPress, onReset, onSetTarget, isCompact, isSmall }) => {
  const progress = Math.min(count / target, 1);
  const isComplete = count >= target;
  const circleSize = isSmall ? 164 : isCompact ? 182 : 200;
  const innerSize = circleSize - 20;
  const countFontSize = isSmall ? 58 : isCompact ? 68 : 80;
  const countLineHeight = isSmall ? 64 : isCompact ? 74 : 88;

  return (
    <View style={counterStyles.wrapper}>
      {/* Circular button */}
      <TouchableOpacity
        style={[
          counterStyles.circle,
          { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
          isComplete && counterStyles.circleComplete,
        ]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        {/* Progress ring visual using border */}
        <View
          style={[
            counterStyles.progressRing,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
              borderColor: isComplete ? Colors.gold : Colors.backgroundCard,
            },
          ]}
        >
          <Text style={[counterStyles.countText, { fontSize: countFontSize, lineHeight: countLineHeight }]}>
            {count}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Target */}
      <Text style={counterStyles.target}>Target: {target}</Text>

      {/* Buttons */}
      <View style={[counterStyles.btnRow, isSmall && counterStyles.btnRowSmall]}>
        <TouchableOpacity
          style={[counterStyles.resetBtn, isCompact && counterStyles.resetBtnCompact, isSmall && counterStyles.resetBtnSmall]}
          onPress={onReset}
        >
          <Text style={counterStyles.resetIcon}>↺</Text>
          <Text style={counterStyles.resetText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={counterStyles.settingsBtn} onPress={onSetTarget}>
          <Text style={counterStyles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const counterStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.backgroundMedium,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.backgroundCard,
    shadowColor: Colors.gold,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  circleComplete: {
    borderColor: Colors.gold,
    shadowOpacity: 0.5,
  },
  progressRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    ...Fonts.bold,
    fontSize: 80,
    color: Colors.textWhite,
    lineHeight: 88,
  },
  target: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 16,
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
    backgroundColor: Colors.backgroundMedium,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: Radius.md,
    width: 160,
    justifyContent: 'center',
  },
  resetBtnCompact: {
    width: 144,
    paddingVertical: 10,
  },
  resetBtnSmall: {
    width: 132,
  },
  resetIcon: {
    fontSize: 18,
    color: Colors.textWhite,
  },
  resetText: {
    ...Fonts.medium,
    fontSize: 16,
    color: Colors.textWhite,
  },
  settingsBtn: {
    width: 48,
    height: 48,
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: { fontSize: 20 },
});

// ─── Screen ───────────────────────────────────────────────────────
export default function DhikrScreen({ navigation }) {
  const [count, setCount] = useState(2);
  const [target] = useState(33);
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const isSmall = width < 340;
  const androidTopInset = Platform.OS === 'android' ? Math.max(StatusBar.currentHeight || 0, 0) : 0;

  const categoryIcons = {
    morning: '🌅',
    evening: '🌙',
    'after-salah': '🤲',
    'before-sleep': '😴',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={[styles.safeArea, { paddingTop: 16 + androidTopInset }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, isCompact && styles.scrollContentCompact]}
        >
          {/* Title */}
          <Text style={[styles.pageTitle, isCompact && styles.pageTitleCompact]}>Digital Tasbih</Text>

          {/* Counter */}
          <TasbihCounter
            count={count}
            target={target}
            onPress={() => setCount((c) => c + 1)}
            onReset={() => setCount(0)}
            onSetTarget={() => {}}
            isCompact={isCompact}
            isSmall={isSmall}
          />

          {/* Divider */}
          <View style={styles.divider} />

          {/* Dhikr Library */}
          <Text style={[styles.sectionTitle, isCompact && styles.sectionTitleCompact]}>Dhikr Library</Text>

          <View style={[styles.libraryList, isCompact && styles.libraryListCompact]}>
            {DHIKR_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.libraryItem, isCompact && styles.libraryItemCompact]}
                activeOpacity={0.7}
                onPress={() => navigation?.navigate('AdhkarDetail', { category: cat })}
              >
                <View style={[styles.libraryIconBg, isCompact && styles.libraryIconBgCompact]}>
                  <Text style={[styles.libraryIcon, isCompact && styles.libraryIconCompact]}>
                    {categoryIcons[cat.id] || '📿'}
                  </Text>
                </View>
                <View style={styles.libraryInfo}>
                  <Text style={[styles.libraryName, isCompact && styles.libraryNameCompact]} numberOfLines={1}>
                    {cat.name}
                  </Text>
                  <Text style={styles.libraryCount}>{cat.count} Adhkar</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
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
  },
  scrollContent: {
    paddingBottom: Spacing.sm,
  },
  scrollContentCompact: {
    paddingBottom: Spacing.md,
  },
  pageTitle: {
    ...Fonts.bold,
    fontSize: 22,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: 8,
  },
  pageTitleCompact: {
    fontSize: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginVertical: 16,
  },
  sectionTitle: {
    ...Fonts.bold,
    fontSize: 20,
    color: Colors.textWhite,
    marginBottom: 12,
  },
  sectionTitleCompact: {
    fontSize: 18,
  },
  libraryList: {
    gap: 4,
    paddingBottom: 16,
  },
  libraryListCompact: {
    gap: 6,
    paddingBottom: 20,
  },
  libraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    padding: 16,
    gap: 16,
  },
  libraryItemCompact: {
    padding: 12,
    gap: 12,
  },
  libraryIconBg: {
    width: 50,
    height: 50,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  libraryIconBgCompact: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  libraryIcon: { fontSize: 24 },
  libraryIconCompact: { fontSize: 20 },
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
  chevron: {
    fontSize: 24,
    color: Colors.textMuted,
  },
});
