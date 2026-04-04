import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LocationPermissionScreen from '../screens/LocationPermissionScreen';
import NotificationPermissionScreen from '../screens/NotificationPermissionScreen';

// Main app screens
import HomeScreen from '../screens/HomeScreen';
import QuranScreen from '../screens/QuranScreen';
import QuranReaderScreen from '../screens/QuranReaderScreen';
import QiblaScreen from '../screens/QiblaScreen';
import DhikrScreen from '../screens/DhikrScreen';
import AdhkarDetailScreen from '../screens/AdhkarDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#021226' },
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

        {/* Main app */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quran" component={QuranScreen} />
        <Stack.Screen name="QuranReader" component={QuranReaderScreen} />
        <Stack.Screen name="Qibla" component={QiblaScreen} />
        <Stack.Screen name="Dhikr" component={DhikrScreen} />
        <Stack.Screen name="AdhkarDetail" component={AdhkarDetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
