import { Navigate, Route, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import LessonsPage from "./pages/LessonsPage";
import NotificationFajrPage from "./pages/NotificationFajrPage";
import PrayerTimesPage from "./pages/PrayerTimesPage";
import ProfilePage from "./pages/ProfilePage";
import SplashPage from "./pages/SplashPage";

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/prayer-times" element={<PrayerTimesPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/notifications/fajr" element={<NotificationFajrPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
