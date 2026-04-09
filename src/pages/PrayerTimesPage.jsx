import PrayerCard from "../components/PrayerCard";

const dailyPrayers = [
  ["Fajr", "5:00 AM"],
  ["Dhuhr", "12:12 PM"],
  ["Asr", "4:35 PM"],
  ["Maghrib", "6:12 PM"],
  ["Isha", "7:36 PM"],
];

export default function PrayerTimesPage() {
  return (
    <section className="page">
      <h1 className="page-title">Prayer Times</h1>
      <p className="page-subtitle">Today&apos;s schedule</p>
      <div className="prayer-list">
        {dailyPrayers.map(([name, time]) => (
          <PrayerCard key={name} name={name} time={time} />
        ))}
      </div>
    </section>
  );
}
