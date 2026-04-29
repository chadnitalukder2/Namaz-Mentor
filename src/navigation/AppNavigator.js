import React from 'react';
import { View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

// Screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LocationPermissionScreen from '../screens/LocationPermissionScreen';
import NotificationPermissionScreen from '../screens/NotificationPermissionScreen';

// Main app screens
import MainTabNavigator from './MainTabNavigator';
import QuranReaderScreen from '../screens/QuranReaderScreen';
import AdhkarDetailScreen from '../screens/AdhkarDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';

const Stack = createNativeStackNavigator();
const NAV_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#021226',
    card: '#021226',
  },
};

export default function AppNavigator() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#021226' }}>
        <NavigationContainer theme={NAV_THEME}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              // Keep default transitions soft to avoid hard "jump" feel.
              animation: 'fade',
              animationDuration: 360,
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
              animationMatchesGesture: true,
              contentStyle: { flex: 1, backgroundColor: '#021226' },
            }}
          >
          {/* Onboarding */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ animation: 'fade', animationDuration: 360 }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              animation: 'fade',
              animationDuration: 360,
              animationTypeForReplace: 'push',
            }}
          />
          <Stack.Screen
            name="LocationPermission"
            component={LocationPermissionScreen}
            options={{ animation: 'fade', animationDuration: 380 }}
          />
          <Stack.Screen
            name="NotificationPermission"
            component={NotificationPermissionScreen}
            options={{ animation: 'fade', animationDuration: 380 }}
          />

          {/* Main app: one stack entry so the bottom tab bar stays fixed while switching tabs */}
          <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{
              animation: 'fade',
              animationDuration: 380,
              animationTypeForReplace: 'push',
            }}
          />
          <Stack.Screen name="QuranReader" component={QuranReaderScreen} />
          <Stack.Screen name="AdhkarDetail" component={AdhkarDetailScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="NotificationSettings"
            component={NotificationSettingsScreen}
            options={{
              // 'modal' on iOS is often a short page sheet; fullScreenModal fills the phone viewport.
              presentation: 'fullScreenModal',
              animation: 'fade_from_bottom',
              animationDuration: 320,
            }}
          />
        </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
