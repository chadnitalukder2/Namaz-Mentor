import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';
import SplashMark from '../components/SplashMark';

const SPLASH_MS = 1800;

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Welcome');
    }, SPLASH_MS);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'right', 'left', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />
      <View style={styles.center}>
        <SplashMark width={79} height={106} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
