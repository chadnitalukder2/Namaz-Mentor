import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import LocationPinIllustration from '../components/LocationPinIllustration';
import MainTabBar from '../components/MainTabBar';
import HomeHeroMosqueIcon from '../components/HomeHeroMosqueIcon';
import { usePrayerTimes, useCountdownToDate } from '../hooks/usePrayerData';
import FajrPrayerIcon from '../components/FajrPrayerIcon';
import DhuhrPrayerIcon from '../components/DhuhrPrayerIcon';
import AsrPrayerIcon from '../components/AsrPrayerIcon';
import MaghribPrayerIcon from '../components/MaghribPrayerIcon';
import IshaPrayerIcon from '../components/IshaPrayerIcon';
import { timingToLocalDate } from '../utils/prayerTimes';
import {
  reschedulePrayerNotifications,
  loadPrayerNotificationSettings,
  isPrayerAdhanSoundOn,
} from '../services/prayerNotifications';

const TOP_SECTION_PADDING = 14;

const PRAYER_SVG_ICONS = {
  fajr: FajrPrayerIcon,
  dhuhr: DhuhrPrayerIcon,
  asr: AsrPrayerIcon,
  maghrib: MaghribPrayerIcon,
  isha: IshaPrayerIcon,
};

export default function HomeScreen({ navigation }) {
  const { prayers, nextPrayer, nextPrayerAt, locationLabel, loading } = usePrayerTimes();
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const locationMaxWidth = Math.max(80, width - 200);
  const androidTopInset =
    Platform.OS === 'android' ? Math.max(StatusBar.currentHeight || 0, 24) : 0;
  const [selectedPrayerId, setSelectedPrayerId] = useState(null);
  const [notifySettings, setNotifySettings] = useState(null);

  const refreshNotifySettings = useCallback(() => {
    loadPrayerNotificationSettings().then(setNotifySettings).catch(() => setNotifySettings(null));
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshNotifySettings();
    }, [refreshNotifySettings])
  );

  const displayLocation = (locationLabel || 'Finding location...')
    .split('·')[0]
    .split(',')[0]
    .trim();

  const upcomingPrayer = useMemo(
    () =>
      (nextPrayer && prayers.find((p) => p.id === nextPrayer.id)) ||
      prayers.find((p) => !p.completed) ||
      prayers[0] ||
      null,
    [prayers, nextPrayer]
  );

  useEffect(() => {
    if (!upcomingPrayer) return;
    if (!selectedPrayerId || !prayers.some((p) => p.id === selectedPrayerId)) {
      setSelectedPrayerId(upcomingPrayer.id);
    }
  }, [selectedPrayerId, prayers, upcomingPrayer]);

  const selectedIndex = useMemo(
    () => prayers.findIndex((p) => p.id === selectedPrayerId),
    [prayers, selectedPrayerId]
  );

  const selectedPrayer =
    (selectedPrayerId && prayers.find((p) => p.id === selectedPrayerId)) || upcomingPrayer;
  const selectedPrayerTarget =
    selectedPrayer?.id === upcomingPrayer?.id
      ? nextPrayerAt || buildPrayerTargetDate(selectedPrayer)
      : buildPrayerTargetDate(selectedPrayer);
  const countdownTicker = useCountdownToDate(selectedPrayerTarget || nextPrayerAt);
  const formattedCountdown = formatHeroCountdown(selectedPrayerTarget);
  const startsAtLabel = selectedPrayer?.time || '--:--';

  const handlePrevPrayer = () => {
    if (!prayers.length) return;
    const currentIndex = selectedIndex >= 0 ? selectedIndex : 0;
    const prevIndex = (currentIndex - 1 + prayers.length) % prayers.length;
    setSelectedPrayerId(prayers[prevIndex].id);
  };

  const handleNextPrayer = () => {
    if (!prayers.length) return;
    const currentIndex = selectedIndex >= 0 ? selectedIndex : 0;
    const nextIndex = (currentIndex + 1) % prayers.length;
    setSelectedPrayerId(prayers[nextIndex].id);
  };

  const timingsSignature =
    prayers.length > 0 ? prayers.map((p) => `${p.id}:${p.rawTime}`).join('|') : '';

  useEffect(() => {
    if (Platform.OS === 'web' || loading || !timingsSignature) return;
    reschedulePrayerNotifications(prayers).catch(() => {});
    // timingsSignature fingerprints raw timings; avoid `prayers` ref (updates every second from hook).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, timingsSignature]);

  const openNotificationSettings = () => {
    if (!selectedPrayer) return;
    navigation?.navigate('NotificationSettings', {
      prayer: selectedPrayer.name,
      prayerId: selectedPrayer.id,
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundBlue}
      />

      <SafeAreaView
        style={[
          styles.safeTop,
          isCompact && styles.safeTopCompact,
          androidTopInset > 0 && { paddingTop: androidTopInset },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.locationPill}>
            <LocationPinIllustration size={16} centerFill={Colors.backgroundBlue} />
            <Text
              style={[styles.locationText, { maxWidth: locationMaxWidth }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {displayLocation}
            </Text>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={Colors.textFrost}
                style={styles.locationSpinner}
              />
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.headerNotifyLink}
            onPress={openNotificationSettings}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Open notification settings for this prayer"
          >
            <Text style={styles.headerNotifyText}>Notification</Text>
            <MaterialCommunityIcons name="bell-outline" size={18} color="#B8C5D6" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroRow}>
          <View style={styles.heroTextBlock}>
            <View style={styles.upcomingPill}>
              <MaterialCommunityIcons name="clock-outline" size={12} color={Colors.gold} />
              <Text style={styles.upcomingPillText}>
                Upcoming: {upcomingPrayer?.name || '--'} {upcomingPrayer?.time || '--:--'}
              </Text>
            </View>
            <Text style={[styles.nextPrayerName, isCompact && styles.nextPrayerNameCompact]}>
              {selectedPrayer?.name || '--'}
            </Text>
            <Text style={[styles.countdown, isCompact && styles.countdownCompact]}>
              {formattedCountdown}
            </Text>
            <Text style={styles.startsAt}>Starts at {startsAtLabel}</Text>
            <View style={styles.heroControls}>
              <TouchableOpacity
                style={styles.controlBtn}
                activeOpacity={0.85}
                onPress={handlePrevPrayer}
                accessibilityRole="button"
                accessibilityLabel="Previous prayer"
              >
                <MaterialCommunityIcons name="chevron-left" size={18} color={Colors.gold} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlBtn}
                activeOpacity={0.85}
                onPress={handleNextPrayer}
                accessibilityRole="button"
                accessibilityLabel="Next prayer"
              >
                <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.gold} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.heroRightColumn}>
            <View style={styles.heroIconWrap}>
              <HomeHeroMosqueIcon size={isCompact ? 102 : 114} />
            </View>
          </View>
        </View>

        {/*<View style={styles.waveWrap}>
          <View style={styles.waveBack} />
          <View style={styles.waveFront} />
        </View> */}
      </SafeAreaView>

      <View style={styles.sheet}>
        <ScrollView
          style={styles.prayerListScroll}
          contentContainerStyle={[styles.prayerList, styles.prayerListContent]}
          showsVerticalScrollIndicator={false}
        >
          {prayers.map((prayer) => (
            <PrayerRow
              key={prayer.id}
              prayer={prayer}
              isNext={prayer.id === nextPrayer?.id}
              isSelected={prayer.id === selectedPrayer?.id}
              adhanSoundOn={
                notifySettings ? isPrayerAdhanSoundOn(notifySettings, prayer.id) : false
              }
            />
          ))}
        </ScrollView>
        <View style={styles.tabBarWrapper}>
          <MainTabBar activeTab="home" navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  safeTop: {
    backgroundColor: Colors.backgroundBlue,
    paddingHorizontal: Spacing.md,
    paddingBottom: 0,
  },
  safeTopCompact: {
    paddingHorizontal: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: 'rgba(2, 18, 38, 1)',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  locationPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minWidth: 0,
    paddingVertical: 4,
    paddingRight: 8,
    paddingLeft: 0,
    borderRadius: Radius.round,
  },
  headerNotifyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
    paddingVertical: 4,
    paddingLeft: 8,
  },
  headerNotifyText: {
    ...Fonts.medium,
    fontSize: 14,
    color: Colors.textWhite,
  },
  locationText: {
    ...Fonts.semiBold,
    fontSize: 16,
    color: Colors.textWhite,
    flexShrink: 1,
  },
  locationSpinner: {
    marginLeft: 6,
  },

  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    // height: 300,
    padding: 20,
    backgroundColor: 'rgba(2, 18, 38, 1)',
  },
  heroTextBlock: {
    flex: 1,
    maxWidth: '62%',
  },
  upcomingPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.round,
    backgroundColor: 'rgba(217, 170, 85, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(217, 170, 85, 0.4)',
    marginBottom: 6,
  },
  upcomingPillText: {
    ...Fonts.medium,
    fontSize: 11,
    color: '#EED39D',
  },
  nextPrayerName: {
    ...Fonts.bold,
    fontSize: 32,
    lineHeight: 38,
    color: Colors.gold,
  },
  nextPrayerNameCompact: {
    fontSize: 24,
    lineHeight: 30,
  },
  countdown: {
    // ...Fonts.,
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 30,
    color: Colors.textWhite,
    marginTop: -2,
  },
  countdownCompact: {
    fontSize: 29,
    lineHeight: 33,
  },
  startsAt: {
    ...Fonts.regular,
    color: '#8CA2BA',
    fontSize: 14,
    marginTop: 2,
  },
  heroControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  controlBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(217, 170, 85, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(2, 18, 38, 0.35)',
  },
  heroRightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroIconWrap: {
    width: 114,
    height: 114,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveWrap: {
    height: 70,
    marginTop: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  // waveBack: {
  //   position: 'absolute',
  //   left: -40,
  //   right: -40,
  //   height: 120,
  //   bottom: -68,
  //   borderTopLeftRadius: 120,
  //   borderTopRightRadius: 120,
  //   backgroundColor: '#1B3B59',
  //   opacity: 0.65,
  // },
  // waveFront: {
  //   position: 'absolute',
  //   left: -20,
  //   right: -20,
  //   height: 110,
  //   bottom: -78,
  //   borderTopLeftRadius: 120,
  //   borderTopRightRadius: 120,
  //   backgroundColor: '#062149',
  // },

  sheet: {
    flex: 1,
    minHeight: 0,
    backgroundColor: Colors.backgroundDark,
    paddingTop: 8,
  },
  prayerListScroll: {
    flex: 1,
  },
  prayerList: {
    paddingHorizontal: 14,
    gap: 12,
    paddingBottom: Spacing.sm,
  },
  prayerListContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  tabBarWrapper: {
    paddingBottom: 12,
    paddingTop: 8,
  },
});

function PrayerRow({ prayer, isNext, isSelected, adhanSoundOn }) {
  const PrayerIcon = PRAYER_SVG_ICONS[prayer.icon];

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      disabled
      style={[
        stylesRow.card,
        isNext && stylesRow.cardNext,
        isSelected && stylesRow.cardSelected,
      ]}
    >
      <View style={stylesRow.left}>
        {PrayerIcon ? (
          <View style={[stylesRow.iconWrap, !isNext && stylesRow.iconMuted]}>
            <PrayerIcon size={24} />
          </View>
        ) : (
          <MaterialCommunityIcons
            name="mosque"
            size={22}
            color={isNext ? Colors.gold : '#8AA2BF'}
          />
        )}
        <Text style={[stylesRow.name, isNext && stylesRow.nameNext]}>{prayer.name}</Text>
      </View>

      <View style={stylesRow.right}>
        <Text style={[stylesRow.time, isNext && stylesRow.timeNext]}>{prayer.time}</Text>
        {prayer.completed ? (
          <MaterialCommunityIcons
            name="check-decagram-outline"
            size={20}
            color="#00E58A"
          />
        ) : adhanSoundOn ? (
          <MaterialCommunityIcons name="volume-high" size={20} color={Colors.gold} />
        ) : (
          <MaterialCommunityIcons name="volume-off" size={20} color="#5E7EA0" />
        )}
      </View>
    </TouchableOpacity>
  );
}

function formatHeroCountdown(targetDate) {
  if (!targetDate) return '0 min';
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes}min`;
  }

  return `${Math.max(1, minutes)}min`;
}

function buildPrayerTargetDate(prayer) {
  if (!prayer?.rawTime) return null;
  const todayDate = timingToLocalDate(prayer.rawTime, 0);
  if (todayDate.getTime() > Date.now()) return todayDate;
  return timingToLocalDate(prayer.rawTime, 1);
}

const stylesRow = StyleSheet.create({
  card: {
    backgroundColor: '#051F3F',
    borderRadius: 14,
    minHeight: 66,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardNext: {
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 138, 0.28)',
  },
  cardSelected: {
    borderWidth: 1,
    borderColor: 'rgba(217, 170, 85, 0.42)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  iconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMuted: {
    opacity: 0.9,
  },
  name: {
    ...Fonts.medium,
    color: '#A2B1C4',
    fontSize: 18,
  },
  nameNext: {
    color: Colors.textWhite,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  time: {
    ...Fonts.medium,
    color: '#E3EDF9',
    fontSize: 18,
  },
  timeNext: {
    color: Colors.textWhite,
  },
});
