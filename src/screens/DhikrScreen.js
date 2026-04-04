import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { DHIKR_CATEGORIES } from '../constants/data';
import MainTabBar from '../components/MainTabBar';

// ─── Circular Counter ─────────────────────────────────────────────
const TasbihCounter = ({ count, target, onPress, onReset, onSetTarget }) => {
  const progress = Math.min(count / target, 1);
  const isComplete = count >= target;

  return (
    <View style={counterStyles.wrapper}>
      {/* Circular button */}
      <TouchableOpacity
        style={[counterStyles.circle, isComplete && counterStyles.circleComplete]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        {/* Progress ring visual using border */}
        <View style={[counterStyles.progressRing, { borderColor: isComplete ? Colors.gold : Colors.backgroundCard }]}>
          <Text style={counterStyles.countText}>{count}</Text>
        </View>
      </TouchableOpacity>

      {/* Target */}
      <Text style={counterStyles.target}>Target: {target}</Text>

      {/* Buttons */}
      <View style={counterStyles.btnRow}>
        <TouchableOpacity style={counterStyles.resetBtn} onPress={onReset}>
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

  const categoryIcons = {
    morning: '🌅',
    evening: '🌙',
    'after-salah': '🤲',
    'before-sleep': '😴',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Title */}
          <Text style={styles.pageTitle}>Digital Tasbih</Text>

          {/* Counter */}
          <TasbihCounter
            count={count}
            target={target}
            onPress={() => setCount((c) => c + 1)}
            onReset={() => setCount(0)}
            onSetTarget={() => {}}
          />

          {/* Divider */}
          <View style={styles.divider} />

          {/* Dhikr Library */}
          <Text style={styles.sectionTitle}>Dhikr Library</Text>

          <View style={styles.libraryList}>
            {DHIKR_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.libraryItem}
                activeOpacity={0.7}
                onPress={() => navigation?.navigate('AdhkarDetail', { category: cat })}
              >
                <View style={styles.libraryIconBg}>
                  <Text style={styles.libraryIcon}>{categoryIcons[cat.id] || '📿'}</Text>
                </View>
                <View style={styles.libraryInfo}>
                  <Text style={styles.libraryName}>{cat.name}</Text>
                  <Text style={styles.libraryCount}>{cat.count} Adhkar</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Tab Bar */}
      <View style={styles.tabBarWrapper}>
        <MainTabBar activeTab="dhikr" navigation={navigation} />
      </View>
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
    paddingTop: 16,
  },
  pageTitle: {
    ...Fonts.bold,
    fontSize: 22,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: 8,
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
  libraryList: {
    gap: 4,
    paddingBottom: 16,
  },
  libraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    padding: 16,
    gap: 16,
  },
  libraryIconBg: {
    width: 50,
    height: 50,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  libraryIcon: { fontSize: 24 },
  libraryInfo: { flex: 1 },
  libraryName: {
    ...Fonts.bold,
    fontSize: 16,
    color: Colors.textWhite,
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
