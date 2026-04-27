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
import LocationPinIllustration from '../components/LocationPinIllustration';

const H_PADDING = 20;

export default function LocationPermissionScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const sectionGap = windowHeight < 700 ? 16 : 24;
  const pinSize = windowHeight < 700 ? 36 : 44;
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
          <LocationPinIllustration size={pinSize} />

          <View style={styles.copyBlock}>
            <Text style={styles.heading}>Enable Location</Text>
            <Text style={styles.subtitle}>
              We use your location to calculate accurate prayer times based on your area.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomSection, { paddingBottom: bottomPad }]}>
        <PrimaryButton
          title="Allow Location"
          onPress={() => navigation?.navigate('NotificationPermission')}
        />

        <GhostButton
          title="Enter Location Manually"
          onPress={() => navigation?.navigate('NotificationPermission')}
        />

        <DotIndicator total={3} active={1} />
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
  copyBlock: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    gap: 24,
  },
  heading: {
    ...Fonts.bold,
    fontSize: 30,
    lineHeight: 39,
    color: Colors.textWarmCream,
    textAlign: 'center',
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
});
