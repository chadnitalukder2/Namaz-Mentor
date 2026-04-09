export default function PrayerCard({ name, time, isNext = false }) {
  return (
    <article className={`prayer-card ${isNext ? "is-next" : ""}`}>
      <div>
        <h4>{name}</h4>
        <p>{time}</p>
      </div>
      <span aria-label={`Reminder for ${name}`}>🔔</span>
    </article>
  );
}
