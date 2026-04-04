import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { Colors, Fonts, Spacing } from '../constants/theme';
import { PrimaryButton, GhostButton, DotIndicator } from '../components/UIComponents';
import WelcomeIllustration from '../components/WelcomeIllustration';

const H_PADDING = 20;
const ILLUSTRATION_ASPECT = 64 / 350;

export default function WelcomeScreen({ navigation }) {
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = windowWidth - H_PADDING * 2;
  const illustrationHeight = contentWidth * ILLUSTRATION_ASPECT;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      <View style={styles.centerContent}>
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

      <View style={styles.bottomSection}>
        <PrimaryButton
          title="Get Started"
          onPress={() => navigation?.navigate('LocationPermission')}
        />

        <GhostButton
          title="Already set up?"
          onPress={() => navigation?.navigate('Home')}
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
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
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
