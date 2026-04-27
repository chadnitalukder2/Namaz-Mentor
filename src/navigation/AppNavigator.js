import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

export default function AppNavigator() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { flex: 1, backgroundColor: '#021226' },
            }}
          >
          {/* Onboarding */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
          <Stack.Screen name="NotificationPermission" component={NotificationPermissionScreen} />

          {/* Main app: one stack entry so the bottom tab bar stays fixed while switching tabs */}
          <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ animation: 'fade' }}
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
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
