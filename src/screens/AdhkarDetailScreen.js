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
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import { fetchAdhkarByCategory } from '../services/adhkarApi';

export default function AdhkarDetailScreen({ navigation, route }) {
  const category = route?.params?.category || { name: 'Morning Adhkar', count: 15 };
  const [counts, setCounts] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApiError, setHasApiError] = useState(false);

  React.useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });

    return () => task.cancel();
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      setHasApiError(false);
      try {
        const { items: fetchedItems } = await fetchAdhkarByCategory(category);
        if (!cancelled) {
          setItems(fetchedItems || []);
        }
      } catch {
        if (!cancelled) {
          setItems([]);
          setHasApiError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [category?.id, category?.hisnEnChapterId]);

  const totalCount = isLoading ? category.count : items.length;

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
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M11.9986 18.9974L4.99951 11.9984L11.9986 4.99931"
                stroke="#F5F7FA"
                strokeWidth={1.99973}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M18.9976 11.9984H4.99951"
                stroke="#F5F7FA"
                strokeWidth={1.99973}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>{category.name}</Text>
            <Text style={styles.subtitle}>{totalCount} Adhkar</Text>
          </View>

        </View>

        {isReady && !isLoading ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {hasApiError ? (
              <Text style={styles.fallbackNote}>API load failed on this device. Please check internet and try again.</Text>
            ) : null}
            {!hasApiError && items.length === 0 ? (
              <Text style={styles.fallbackNote}>No adhkar found for this category.</Text>
            ) : null}
            {items.map((dhikr) => {
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
                  {isDone ? (
                    <LinearGradient
                      colors={['rgba(249, 201, 113, 1)', 'rgba(166, 130, 65, 1)']}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={[styles.countRow, styles.countRowDone]}
                    >
                      <TouchableOpacity onPress={() => increment(dhikr.id, dhikr.target)} activeOpacity={0.7}>
                        <View style={styles.countInner}>
                          <Text style={styles.countPlus}>+</Text>
                          <Text style={[styles.countText, styles.countTextDone]}>
                            {currentCount} / {dhikr.target}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </LinearGradient>
                  ) : (
                    <TouchableOpacity
                      style={styles.countRow}
                      onPress={() => increment(dhikr.id, dhikr.target)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.countPlus}>+</Text>
                      <Text style={styles.countText}>
                        {currentCount} / {dhikr.target}
                      </Text>
                    </TouchableOpacity>
                  )}
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
  safeArea: {
    flex: 1,
    paddingTop: 20,
  },
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
  fallbackNote: {
    ...Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
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
    marginTop: 2,
    minHeight: 42,
    borderRadius: Radius.round,
    backgroundColor: 'rgba(142, 143, 157, 1)',
  },
  countRowDone: {
    backgroundColor: 'transparent',
  },
  countInner: {
    minHeight: 42,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  countPlus: {
    ...Fonts.bold,
    fontSize: 21,
    lineHeight: 23,
    color: 'rgba(16, 14, 29, 1)',
  },
  countText: {
    ...Fonts.bold,
    fontSize: 22,
    lineHeight: 24,
    color: 'rgba(16, 14, 29, 1)',
  },
  countTextDone: {
    color: 'rgba(16, 14, 29, 1)',
  },
});
