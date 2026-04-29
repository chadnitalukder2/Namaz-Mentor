import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainTabBar from '../components/MainTabBar';
import { Colors, Spacing } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import QuranScreen from '../screens/QuranScreen';
import QiblaScreen from '../screens/QiblaScreen';
import DhikrScreen from '../screens/DhikrScreen';

const Tab = createBottomTabNavigator();

const ROUTE_TO_TAB_ID = {
  Home: 'home',
  Quran: 'quran',
  Qibla: 'qibla',
  Dhikr: 'dhikr',
};

function MainTabBarContainer({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const routeName = state.routes[state.index]?.name;
  const activeTab = ROUTE_TO_TAB_ID[routeName] || 'home';
  const paddingBottom = Math.max(insets.bottom, Spacing.sm);

  return (
    <View style={[styles.tabBarWrap, { paddingBottom }]}>
      <MainTabBar activeTab={activeTab} navigation={navigation} />
    </View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MainTabBarContainer {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: false,
        sceneStyle: { backgroundColor: Colors.backgroundDark },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Quran" component={QuranScreen} />
      <Tab.Screen name="Qibla" component={QiblaScreen} />
      <Tab.Screen name="Dhikr" component={DhikrScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrap: {
    backgroundColor: Colors.backgroundDark,
    paddingTop: 8,
  },
});
