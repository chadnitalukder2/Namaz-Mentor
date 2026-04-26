import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/theme';

/** Matches Figma Namaz-Mentor (node 415-15904) — not OS `Switch`. */
const TRACK_W = 52;
const TRACK_H = 32;
const THUMB = 28;
const PAD = 2;
const THUMB_X_OFF = PAD;
const THUMB_X_ON = TRACK_W - PAD - THUMB;

export default function PrayerNotificationSwitch({ value, onValueChange, disabled = false }) {
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      friction: 9,
      tension: 100,
    }).start();
  }, [value, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [THUMB_X_OFF, THUMB_X_ON],
  });

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <View
        style={[
          styles.track,
          { backgroundColor: value ? Colors.notificationSwitchTrackOn : Colors.notificationSwitchTrackOff },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: value
                ? Colors.notificationSwitchThumbOn
                : Colors.notificationSwitchThumbOff,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    overflow: 'hidden',
  },
  thumb: {
    position: 'absolute',
    left: 0,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    top: (TRACK_H - THUMB) / 2,
  },
});
