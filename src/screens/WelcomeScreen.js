import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing } from '../constants/theme';
import { PrimaryButton, GhostButton, DotIndicator } from '../components/UIComponents';
import WelcomeIllustration from '../components/WelcomeIllustration';

const H_PADDING = 20;
const ILLUSTRATION_ASPECT = 64 / 350;

/** ~primary + ghost + dots + gaps; keeps illustration from crowding CTAs on short phones */
const BOTTOM_ACTIONS_RESERVE = 232;

export default function WelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const contentWidth = windowWidth - H_PADDING * 2;
  const midBudget = Math.max(
    120,
    windowHeight - insets.top - insets.bottom - BOTTOM_ACTIONS_RESERVE,
  );
  const illustrationHeight = Math.min(
    contentWidth * ILLUSTRATION_ASPECT,
    Math.max(48, midBudget * 0.45),
  );
  const sectionGap = windowHeight < 700 ? 20 : 32;
  const bottomPad = Math.max(Spacing.xl, insets.bottom + Spacing.sm);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={[styles.centerContent, { gap: sectionGap }]}>
          <View style={styles.illustrationWrap}>
            <WelcomeIllustration width={contentWidth} height={illustrationHeight} />
          </View>

          <View style={styles.copyBlock}>
            <Text style={styles.heading}>
              Your Daily Islamic{'\n'}Companion
            </Text>
            <Text style={styles.subtitle}>
              Accurate prayer times, Quran, Qibla and Dhikr — all in one calm space.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomSection, { paddingBottom: bottomPad }]}>
        <PrimaryButton
          title="Get Started"
          onPress={() => navigation?.navigate('LocationPermission')}
        />

        <GhostButton
          title="Already set up?"
          onPress={() => navigation?.replace('MainTabs', { screen: 'Home' })}
          style={styles.ghostBtn}
        />

        <DotIndicator total={3} active={0} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    paddingHorizontal: H_PADDING,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.md,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationWrap: {
    width: '100%',
    alignItems: 'center',
  },
  copyBlock: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    gap: 24,
  },
  heading: {
    ...Fonts.bold,
    fontSize: 30,
    color: Colors.textWarmCream,
    textAlign: 'center',
    lineHeight: 39,
  },
  subtitle: {
    ...Fonts.regular,
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 25.6,
    paddingHorizontal: 8,
  },
  bottomSection: {
    paddingBottom: Spacing.xl,
    alignItems: 'center',
    gap: 16,
    maxWidth: 350,
    width: '100%',
    alignSelf: 'center',
  },
  ghostBtn: {
    paddingVertical: 4,
  },
});
