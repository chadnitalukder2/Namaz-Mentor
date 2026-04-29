import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { MORNING_ADHKAR } from '../constants/data';

export default function AdhkarDetailScreen({ navigation, route }) {
  const category = route?.params?.category || { name: 'Morning Adhkar', count: 15 };
  const [counts, setCounts] = useState({});
  const [isReady, setIsReady] = useState(false);

  React.useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });

    return () => task.cancel();
  }, []);

  const increment = (id, target) => {
    setCounts((prev) => {
      const current = prev[id] || 0;
      if (current >= target) return prev;
      return { ...prev, [id]: current + 1 };
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>{category.name}</Text>
            <Text style={styles.subtitle}>{category.count} Adhkar</Text>
          </View>

        </View>

        {isReady ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {MORNING_ADHKAR.map((dhikr) => {
              const currentCount = counts[dhikr.id] || 0;
              const isDone = currentCount >= dhikr.target;

              return (
                <View key={dhikr.id} style={[styles.dhikrCard, isDone && styles.dhikrCardDone]}>
                  {/* Title & Reference */}
                  <View style={styles.dhikrHeader}>
                    <Text style={styles.dhikrTitle}>{dhikr.title}</Text>
                    {dhikr.reference ? (
                      <Text style={styles.dhikrRef}>{dhikr.reference}</Text>
                    ) : null}
                  </View>

                  {/* Arabic */}
                  <Text style={styles.arabicText}>{dhikr.arabic}</Text>

                  {/* Transliteration */}
                  {dhikr.transliteration && (
                    <Text style={styles.transliterationText}>{dhikr.transliteration}</Text>
                  )}

                  {/* Translation */}
                  <Text style={styles.translationText}>{dhikr.translation}</Text>

                  {/* Divider */}
                  <View style={styles.divider} />

                  {/* Counter */}
                  <TouchableOpacity
                    style={styles.countRow}
                    onPress={() => increment(dhikr.id, dhikr.target)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.countIcon}>📿</Text>
                    <Text style={[styles.countText, isDone && styles.countTextDone]}>
                      {currentCount} / {dhikr.target}
                    </Text>
                    {isDone && <Text style={styles.doneIcon}>✓</Text>}
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="small" color={Colors.gold} />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: Colors.textWhite,
    lineHeight: 32,
    marginTop: -6,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -32,
  },
  title: {
    ...Fonts.bold,
    fontSize: 20,
    color: Colors.textWhite,
  },
  subtitle: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },

  scrollContent: {
    padding: 20,
    gap: 12,
    paddingBottom: 32,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dhikrCard: {
    backgroundColor: Colors.backgroundMedium,
    borderRadius: Radius.md,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dhikrCardDone: {
    borderColor: 'rgba(217, 170, 85, 0.3)',
  },
  dhikrHeader: {
    gap: 2,
  },
  dhikrTitle: {
    ...Fonts.bold,
    fontSize: 16,
    color: Colors.textWhite,
  },
  dhikrRef: {
    ...Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
  },
  arabicText: {
    fontSize: 22,
    color: Colors.textWhite,
    textAlign: 'right',
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  transliterationText: {
    ...Fonts.regular,
    fontSize: 13,
    color: Colors.gold,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  translationText: {
    ...Fonts.regular,
    fontSize: 14,
    color: Colors.textGrey,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  countIcon: { fontSize: 16 },
  countText: {
    ...Fonts.medium,
    fontSize: 16,
    color: Colors.textMuted,
  },
  countTextDone: {
    color: Colors.gold,
  },
  doneIcon: {
    fontSize: 16,
    color: Colors.gold,
  },
});
