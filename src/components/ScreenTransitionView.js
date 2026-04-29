import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function ScreenTransitionView({ children, style }) {
  const isFocused = useIsFocused();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isFocused) return;

    translateY.setValue(6);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isFocused, translateY]);

  return (
    <Animated.View
      style={[
        styles.base,
        style,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});
