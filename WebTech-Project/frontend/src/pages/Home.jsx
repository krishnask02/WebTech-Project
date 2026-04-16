import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="home-page">
      <div className="navbar">
        <h2 className="home-logo" onClick={() => navigate("/")}>
          TripSync
        </h2>

        <div>
          <span
            className={isActive("/home") || isActive("/") ? "active-nav" : ""}
            onClick={() => navigate("/home")}
          >
            Home
          </span>

          <span
            className={isActive("/planner") ? "active-nav" : ""}
            onClick={() => navigate("/planner")}
          >
            Planner
          </span>

          <span
            className={isActive("/login") ? "active-nav" : ""}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>

      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <h1>
              Discover the World <br />
              <span>Your Way</span>
            </h1>

            <p>
              Smart trip planning powered by AI. Budget, comfort, itinerary,
              and destination ideas — all in one beautiful experience.
            </p>

            <div className="home-buttons">
              <button
                className="primary-btn"
                onClick={() => navigate("/planner")}
              >
                Start Planning 🚀
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Explore Destinations</h3>
          <p>
            Discover travel locations based on your budget, comfort, and
            preferences.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💸</div>
          <h3>Smart Budgeting</h3>
          <p>
            Get a clear estimate of your travel spending and plan within your
            budget.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🗺️</div>
          <h3>Interactive Itinerary</h3>
          <p>
            Add, remove, and reorder destinations to create your perfect trip
            plan.
          </p>
        </div>
      </section>

      <section className="home-stats">
        <div className="stat-box">
          <h2>10K+</h2>
          <p>Trips Planned</p>
        </div>

        <div className="stat-box">
          <h2>500+</h2>
          <p>Destinations</p>
        </div>

        <div className="stat-box">
          <h2>99%</h2>
          <p>User Satisfaction</p>
        </div>
      </section>

      <section className="home-cta">
        <h2>Ready to plan your next adventure?</h2>
        <p>
          Build your personalized trip with budget insights, destination
          suggestions, and itinerary management.
        </p>
        <button
          className="primary-btn"
          onClick={() => navigate("/planner")}
        >
          Go to Planner
        </button>
      </section>
    </div>
  );
}