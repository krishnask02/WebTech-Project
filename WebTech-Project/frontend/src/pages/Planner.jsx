import { useNavigate, useLocation } from "react-router-dom";
import BudgetSlider from "../components/BudgetSlider";
import ItineraryBuilder from "../components/ItineraryBuilder";
import RecommendationPanel from "../components/RecommendationPanel";
import Dashboard from "../components/Dashboard";
import MapView from "../components/MapView";
import "../App.css";

export default function Planner() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div>
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

      <div className="hero">
        <div className="hero-overlay">
          <h1>Plan Your Perfect Trip</h1>
          <p>
            Smart budgeting, recommendations, itinerary planning, and route
            visualization
          </p>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <BudgetSlider />
        </div>

        <div className="card">
          <RecommendationPanel />
        </div>

        <div className="card">
          <ItineraryBuilder />
        </div>

        <div className="card">
          <Dashboard />
        </div>
      </div>

      <div className="destinations">
        <h2>Top Destinations</h2>

        <div className="dest-grid">
          <div className="dest-card">
            <img
              src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600"
              alt="Goa"
            />
            <p>Goa</p>
          </div>

          <div className="dest-card">
            <img
              src="https://images.unsplash.com/photo-1565027456627-5aa7d07b95a2?w=600"
              alt="Manali"
            />
            <p>Manali</p>
          </div>

          <div className="dest-card">
            <img
              src="https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=2071"
              alt="Jaipur"
            />
            <p>Jaipur</p>
          </div>

          <div className="dest-card">
            <img
              src="https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?w=600"
              alt="Kerala"
            />
            <p>Kerala</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <MapView />
        </div>
      </div>
    </div>
  );
}