import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/prayer-times", label: "Prayers" },
  { to: "/lessons", label: "Lessons" },
  { to: "/notifications/fajr", label: "Alerts" },
  { to: "/profile", label: "Profile" },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {links.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
