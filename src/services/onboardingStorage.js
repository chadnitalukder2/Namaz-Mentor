import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@namazmentor/onboarding_completed';

export async function getHasCompletedOnboarding() {
  const v = await AsyncStorage.getItem(KEY);
  return v === '1';
}

export async function setOnboardingCompleted() {
  await AsyncStorage.setItem(KEY, '1');
}
