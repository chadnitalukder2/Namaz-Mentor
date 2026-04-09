import React, { useEffect, useMemo, useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radius } from '../constants/theme';
import LocationPinIllustration from '../components/LocationPinIllustration';
import MainTabBar from '../components/MainTabBar';
import { usePrayerTimes, useCountdownToDate } from '../hooks/usePrayerData';
import FajrPrayerIcon from '../components/FajrPrayerIcon';
import DhuhrPrayerIcon from '../components/DhuhrPrayerIcon';
import AsrPrayerIcon from '../components/AsrPrayerIcon';
import MaghribPrayerIcon from '../components/MaghribPrayerIcon';
import IshaPrayerIcon from '../components/IshaPrayerIcon';
import { timingToLocalDate } from '../utils/prayerTimes';

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
  const locationMaxWidth = Math.max(130, width - 110);
  const androidTopInset =
    Platform.OS === 'android' ? Math.max(StatusBar.currentHeight || 0, 24) : 0;
  const [selectedPrayerId, setSelectedPrayerId] = useState(null);

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
          androidTopInset > 0 && { paddingTop: TOP_SECTION_PADDING + androidTopInset },
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

          <LinearGradient
            colors={['rgba(217, 170, 85, 0.55)', 'rgba(217, 170, 85, 0.12)']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.heroIconRing}
          >
            <LinearGradient
              colors={['rgba(6, 31, 60, 0.95)', 'rgba(4, 19, 39, 0.95)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroIconCenter}
            >
              <MaterialCommunityIcons name="mosque-outline" size={58} color={Colors.gold} />
            </LinearGradient>
          </LinearGradient>
        </View>

        <View style={styles.waveWrap}>
          <View style={styles.waveBack} />
          <View style={styles.waveFront} />
        </View>
      </SafeAreaView>

      <View style={styles.sheet}>
        <ScrollView
          contentContainerStyle={styles.prayerList}
          showsVerticalScrollIndicator={false}
        >
          {prayers.map((prayer) => (
            <PrayerRow
              key={prayer.id}
              prayer={prayer}
              isNext={prayer.id === nextPrayer?.id}
              isSelected={prayer.id === selectedPrayer?.id}
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
    paddingTop: TOP_SECTION_PADDING,
    paddingBottom: 0,
  },
  safeTopCompact: {
    paddingHorizontal: 14,
  },
  header: {
    alignItems: 'flex-start',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingRight: 8,
    paddingLeft: 0,
    borderRadius: Radius.round,
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
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
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
    fontSize: 44,
    color: Colors.gold,
    lineHeight: 48,
  },
  nextPrayerNameCompact: {
    fontSize: 36,
    lineHeight: 40,
  },
  countdown: {
    ...Fonts.semiBold,
    fontSize: 34,
    color: Colors.textWhite,
    lineHeight: 38,
    marginTop: -2,
  },
  countdownCompact: {
    fontSize: 29,
    lineHeight: 33,
  },
  startsAt: {
    ...Fonts.regular,
    color: '#8CA2BA',
    fontSize: 16,
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
  heroIconRing: {
    width: 124,
    height: 124,
    borderRadius: 62,
    padding: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D9AA55',
    shadowOpacity: 0.26,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  heroIconCenter: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(217, 170, 85, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveWrap: {
    height: 70,
    marginTop: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  waveBack: {
    position: 'absolute',
    left: -40,
    right: -40,
    height: 120,
    bottom: -68,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    backgroundColor: '#1B3B59',
    opacity: 0.65,
  },
  waveFront: {
    position: 'absolute',
    left: -20,
    right: -20,
    height: 110,
    bottom: -78,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    backgroundColor: '#062149',
  },

  sheet: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    paddingTop: 8,
  },
  prayerList: {
    paddingHorizontal: 14,
    gap: 12,
    paddingBottom: Spacing.sm,
  },
  tabBarWrapper: {
    paddingBottom: 12,
    paddingTop: 8,
  },
});

function PrayerRow({ prayer, isNext, isSelected }) {
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
