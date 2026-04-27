import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Colors, Fonts, Radius } from '../constants/theme';
import {
  loadPrayerNotificationSettings,
  updatePrayerNotificationSetting,
  reschedulePrayerNotifications,
  requestNotificationPermissions,
} from '../services/prayerNotifications';
import { fetchAdhanRelatedAudioFromApi } from '../services/adhanApi';
import NotificationBellRowIcon from '../components/NotificationBellRowIcon';
import AzaanRowIcon from '../components/AzaanRowIcon';
import SilentModeRowIcon from '../components/SilentModeRowIcon';
import PrayerNotificationSwitch from '../components/PrayerNotificationSwitch';

function mainRowSubtitle(soundMode) {
  if (soundMode === 'silent') return 'Notification without sound';
  return 'Play Adhan with sound';
}

const BACK_ARROW_LEFT_PATH = 'M11.9983 18.9974L4.99927 11.9984L11.9983 4.99931';
const BACK_ARROW_LINE_PATH = 'M18.9974 11.9984H4.99927';
const BACK_ARROW_STROKE = 1.99973;

function RadioDot({ selected }) {
  return (
    <View style={[styles.radio, selected && styles.radioActive]}>
      {selected ? <View style={styles.radioDot} /> : null}
    </View>
  );
}

export default function NotificationSettingsScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const prayerId = route?.params?.prayerId || 'fajr';
  const prayerName = route?.params?.prayer || 'Fajr';

  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [soundMode, setSoundMode] = useState('azaan');

  const refreshFromStorage = useCallback(async () => {
    const all = await loadPrayerNotificationSettings();
    const s = all[prayerId];
    setNotificationEnabled(s.enabled);
    setSoundMode(s.soundMode === 'silent' ? 'silent' : 'azaan');
    fetchAdhanRelatedAudioFromApi().catch(() => {});
  }, [prayerId]);

  useFocusEffect(
    useCallback(() => {
      refreshFromStorage();
    }, [refreshFromStorage])
  );

  const persistAndReschedule = async (partial) => {
    await updatePrayerNotificationSetting(prayerId, partial);
    // Reschedule can be slow; never block returning after settings are saved.
    reschedulePrayerNotifications().catch(() => {});
  };

  const goBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation?.navigate('MainTabs', { screen: 'Home' });
    }
  };

  const onMainToggle = async (value) => {
    setNotificationEnabled(value);
    if (value && Platform.OS !== 'web') {
      await requestNotificationPermissions();
    }
    await persistAndReschedule({ enabled: value });
  };

  const selectAzaan = async () => {
    if (!notificationEnabled) return;
    setSoundMode('azaan');
    await persistAndReschedule({ soundMode: 'azaan' });
  };

  const selectSilent = async () => {
    if (!notificationEnabled) return;
    setSoundMode('silent');
    await persistAndReschedule({ soundMode: 'silent' });
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />

      {/* <View style={styles.dragHandle} /> */}

      <View style={styles.header}>
        <Pressable
          onPress={goBack}
          style={({ pressed }) => [styles.headerSide, pressed && styles.headerSidePressed]}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" accessibilityRole="image">
            <Path
              d={BACK_ARROW_LEFT_PATH}
              stroke={Colors.textWhite}
              strokeWidth={BACK_ARROW_STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d={BACK_ARROW_LINE_PATH}
              stroke={Colors.textWhite}
              strokeWidth={BACK_ARROW_STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
        <View style={styles.headerTitleWrap} pointerEvents="none">
          <Text style={styles.title} numberOfLines={1}>
            Notification for {prayerName}
          </Text>
        </View>
        <View style={styles.headerSide} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(24, insets.bottom + 16) },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.scrollMain}>
          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={styles.iconBg}>
                  <NotificationBellRowIcon size={22} />
                </View>
                <View style={styles.toggleTextWrap}>
                  <Text style={styles.rowLabel}>Notification</Text>
                  <Text style={styles.rowSub}>{mainRowSubtitle(soundMode)}</Text>
                </View>
              </View>
              <PrayerNotificationSwitch value={notificationEnabled} onValueChange={onMainToggle} />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Sound mode</Text>
          <View style={styles.radioRowContainer}>
            <TouchableOpacity
              style={[styles.radioRow, !notificationEnabled && styles.radioRowDisabled]}
              onPress={selectAzaan}
              activeOpacity={0.75}
              disabled={!notificationEnabled}
            >
              <View style={styles.toggleLeft}>
                <View style={styles.iconBg}>
                  <AzaanRowIcon size={22} />
                </View>
                <View style={styles.toggleTextWrap}>
                  <Text style={styles.rowLabel}>Azaan</Text>
                  <Text style={styles.rowSub}>Play call to prayer</Text>
                </View>
              </View>
              <RadioDot selected={soundMode === 'azaan'} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioRow, !notificationEnabled && styles.radioRowDisabled]}
              onPress={selectSilent}
              activeOpacity={0.75}
              disabled={!notificationEnabled}
            >
              <View style={styles.toggleLeft}>
                <View style={styles.iconBg}>
                  <SilentModeRowIcon size={22} />
                </View>
                <View style={styles.toggleTextWrap}>
                  <Text style={styles.rowLabel}>Silent Mode</Text>
                  <Text style={styles.rowSub}>Notification without sound</Text>
                </View>
              </View>
              <RadioDot selected={soundMode === 'silent'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            Note: Azaan and Silent Mode cannot be enabled at the same time. Choose one sound
            preference for your prayer notifications.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  headerSide: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerSidePressed: {
    opacity: 0.7,
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    minWidth: 0,
  },
  title: {
    ...Fonts.semiBold,
    fontSize: 18,
    color: Colors.textWhite,
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollMain: {
    gap: 16,
  },

  card: {
    backgroundColor:'rgba(6, 24, 47, 1)',
    borderRadius: Radius.md,
    overflow: 'hidden',
    gap: 16,
  },

  radioRowContainer: {
    gap: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(6, 24, 47, 1)',
  },
  radioRowDisabled: {
    opacity: 0.45,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
    minWidth: 0,
  },
  toggleTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(2, 18, 38, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    ...Fonts.bold,
    fontSize: 16,
    color: 'rgba(245, 247, 250, 1)',
  },
  rowSub: {
    ...Fonts.regular,
    fontSize: 13,
    color: 'rgba(166, 150, 119, 1)',
    marginTop: 8,
  },

  sectionTitle: {
    ...Fonts.semiBold,
    fontSize: 14,
    letterSpacing: 0.6,
    color: 'rgba(142, 143, 157, 1)',
    textTransform: 'uppercase',
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: Colors.gold,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.gold,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginLeft: 78,
  },

  noteCard: {
    backgroundColor: 'rgba(6, 24, 47, 1)',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(166, 150, 119, 0.13)',
    padding: 16,
  },
  noteText: {
    ...Fonts.regular,
    fontSize: 13,
    color: 'rgba(142, 143, 157, 1)',
    lineHeight: 20,
  },
});
