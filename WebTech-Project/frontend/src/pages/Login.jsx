import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token || "demo-token");

      alert("Login successful ✅");
      navigate("/planner");
    } catch (error) {
      console.log(error);
      localStorage.setItem("token", "demo-token");
      alert("Backend not connected yet. Logged in with demo mode.");
      navigate("/planner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <span style={styles.backLink} onClick={() => navigate("/home")}>
          ← Back to Home
        </span>
      </div>

      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <h1 style={styles.brand}>TripSync</h1>
          <p style={styles.tagline}>
            Plan smarter journeys with budgeting, itinerary building, and destination recommendations.
          </p>
        </div>

        <form style={styles.formCard} onSubmit={handleLogin}>
          <h2 style={styles.heading}>Welcome Back</h2>
          <p style={styles.subtext}>Login to continue planning your next trip.</p>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <div style={styles.passwordBox}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <span
              style={styles.toggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={styles.footerText}>
            Don’t have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #f8fbff)",
    padding: "24px"
  },
  topBar: {
    maxWidth: "1100px",
    margin: "0 auto 20px"
  },
  backLink: {
    color: "#4f46e5",
    fontWeight: "600",
    cursor: "pointer"
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    minHeight: "calc(100vh - 80px)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
    alignItems: "center"
  },
  leftPanel: {
    padding: "20px"
  },
  brand: {
    fontSize: "52px",
    margin: "0 0 16px",
    color: "#312e81"
  },
  tagline: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#4b5563",
    maxWidth: "480px"
  },
  formCard: {
    background: "#ffffff",
    padding: "36px",
    borderRadius: "22px",
    boxShadow: "0 14px 35px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "420px",
    justifySelf: "center"
  },
  heading: {
    margin: "0 0 8px",
    color: "#111827"
  },
  subtext: {
    margin: "0 0 20px",
    color: "#6b7280"
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    margin: "10px 0",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box"
  },
  passwordBox: {
    position: "relative"
  },
  toggle: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer"
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px"
  },
  footerText: {
    marginTop: "18px",
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center"
  },
  link: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "600"
  }
};