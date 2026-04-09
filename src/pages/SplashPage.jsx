import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 900);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="page">
      <h1 className="page-title">NamazApp</h1>
      <p className="page-subtitle">Preparing your prayer dashboard...</p>
    </section>
  );
}
