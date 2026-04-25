import { configurePrayerNotificationHandler } from './src/services/prayerNotifications';
import AppNavigator from './src/navigation/AppNavigator';

configurePrayerNotificationHandler();

export default function App() {
  return <AppNavigator />;
}
