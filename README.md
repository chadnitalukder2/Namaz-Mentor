# 🕌 Namaz Mentor — React Native App

A beautiful Islamic companion app built with React Native (Expo), faithfully translated from your Figma design.

---

## 📱 Screens Implemented

| Screen | Description |
|--------|-------------|
| **WelcomeScreen** | Splash/onboarding with logo, tagline, Get Started CTA |
| **LocationPermissionScreen** | Request location access for prayer times |
| **NotificationPermissionScreen** | Request Adhan notification permission |
| **HomeScreen** | Live prayer countdown, today's prayer times, mosque hero |
| **QiblaScreen** | Animated compass pointing to Makkah |
| **QuranScreen** | Full Surah list with search, continue reading banner |
| **QuranReaderScreen** | Ayah-by-ayah Arabic + translation with audio controls |
| **DhikrScreen** | Digital Tasbih counter + Dhikr library |
| **AdhkarDetailScreen** | Morning/Evening/After Salah Adhkar with counters |
| **SettingsScreen** | Location, calculation method, Madhab, Adhan sound |
| **NotificationSettingsScreen** | Per-prayer notification & Azaan/Silent toggle |

---

## 🎨 Design System

All colors, spacing, and typography are extracted directly from your Figma file:

```
Background Dark:   #021226
Background Medium: #06182f
Background Blue:   #123859
Card Background:   #17446c
Gold Accent:       #D9AA55  (gradient: #F9C971 → #A68241 → #5C3C01)
Text White:        #FFFFFF
Text Muted:        #8E8F9D
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Studio

### Install & Run

```bash
# 1. Install dependencies
cd NamazMentor
npm install

# 2. Start development server
npx expo start

# 3. Press:
#    i  → Open in iOS Simulator
#    a  → Open in Android Emulator
#    w  → Open in browser (limited)
#    Scan QR → Open in Expo Go app on your phone
```

---

## 📁 Project Structure

```
NamazMentor/
├── App.js                          # Entry point
├── app.json                        # Expo config
├── package.json
└── src/
    ├── constants/
    │   ├── theme.js                # Colors, fonts, spacing
    │   └── data.js                 # Prayers, Surahs, Adhkar data
    ├── components/
    │   └── UIComponents.js         # Shared: PrayerCard, TabBar, etc.
    ├── hooks/
    │   └── usePrayerData.js        # Prayer times, countdown, tasbih
    ├── navigation/
    │   └── AppNavigator.js         # Stack navigator setup
    └── screens/
        ├── WelcomeScreen.js
        ├── LocationPermissionScreen.js
        ├── NotificationPermissionScreen.js
        ├── HomeScreen.js
        ├── QiblaScreen.js
        ├── QuranScreen.js
        ├── QuranReaderScreen.js
        ├── DhikrScreen.js
        ├── AdhkarDetailScreen.js
        ├── SettingsScreen.js
        └── NotificationSettingsScreen.js
```

---

## 🔌 Next Steps — Real Features to Integrate

### 1. Live Prayer Times API
```bash
npm install axios
```
Use [Aladhan API](https://aladhan.com/prayer-times-api) — free, no key needed:
```js
// GET https://api.aladhan.com/v1/timingsByCity?city=Sylhet&country=BD&method=1
```

### 2. Device Location
```bash
npx expo install expo-location
```
```js
import * as Location from 'expo-location';
const { coords } = await Location.getCurrentPositionAsync({});
```

### 3. Push Notifications (Adhan)
```bash
npx expo install expo-notifications expo-task-manager
```

### 4. Compass for Qibla
```bash
npx expo install expo-sensors
```
```js
import { Magnetometer } from 'expo-sensors';
```

### 5. Quran Audio
```bash
npm install expo-av
```
Use [Al Quran Cloud API](https://alquran.cloud/api) for audio recitations.

### 6. Arabic Fonts
Add a proper Arabic font (e.g. Amiri or Scheherazade New):
```bash
npx expo install expo-font @expo-google-fonts/amiri
```

---

## 🕌 Prayer Calculation Methods Supported

| Method | Region |
|--------|--------|
| Karachi (University of Islamic Sciences) | Pakistan, Bangladesh, India |
| ISNA | North America |
| Muslim World League | Europe, Far East |
| Umm Al-Qura | Saudi Arabia |
| Egyptian | Egypt |

Set via `Settings > Calculation Method` in the app.

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `@react-navigation/native` | Navigation container |
| `@react-navigation/native-stack` | Stack-based navigation |
| `react-native-screens` | Native screen optimization |
| `react-native-safe-area-context` | Safe area handling |
| `expo` | Build tooling & modules |

---

## 🤲 Made with ♥ for the Ummah
