import PrayerCard from "../components/PrayerCard";

const prayers = [
  { name: "Fajr", time: "5:00 AM" },
  { name: "Dhuhr", time: "12:12 PM" },
  { name: "Asr", time: "4:35 PM", isNext: true },
  { name: "Maghrib", time: "6:12 PM" },
  { name: "Isha", time: "7:36 PM" },
];

export default function HomePage() {
  return (
    <section className="page">
      <div className="home-hero">
        <p className="hero-label">NEXT PRAYER</p>
        <div className="next-prayer-box">
          <div className="next-prayer-inner">
            <h2>Asr</h2>
            <p className="countdown">01:12:47</p>
            <p>Starts at 4:35 PM</p>
          </div>
        </div>
      </div>

      <div className="prayer-list">
        {prayers.map((prayer) => (
          <PrayerCard
            key={prayer.name}
            name={prayer.name}
            time={prayer.time}
            isNext={prayer.isNext}
          />
        ))}
      </div>
    </section>
  );
}
