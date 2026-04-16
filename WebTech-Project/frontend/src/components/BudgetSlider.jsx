import { useState } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export default function BudgetSlider() {
  const { budget, setBudget, comfort, setComfort } = useContext(AppContext);

  // 🎯 Derived Logic (Smart Recommendation)
  const getHotelType = () => {
    if (budget < 3000) return "Budget Hotels";
    if (budget < 8000) return "Standard Hotels";
    return "Luxury Hotels";
  };

  const getTravelStyle = () => {
    if (comfort <= 2) return "Backpacking";
    if (comfort <= 4) return "Balanced Travel";
    return "Premium Travel ✈️";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Smart Budget Planner </h2>

      
      <div style={styles.section}>
        <label>Budget: ₹{budget}</label>
        <input
          type="range"
          min="1000"
          max="20000"
          step="500"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          style={styles.slider}
        />
      </div>

      <div style={styles.section}>
        <label>Comfort Level: {comfort}</label>
        <input
          type="range"
          min="1"
          max="5"
          value={comfort}
          onChange={(e) => setComfort(Number(e.target.value))}
          style={styles.slider}
        />
      </div>

      <div style={styles.resultBox}>
        <p><strong>Suggested Stay:</strong> {getHotelType()}</p>
        <p><strong>Travel Style:</strong> {getTravelStyle()}</p>
        <p><strong>Estimated Daily Spend:</strong> ₹{Math.floor(budget / 3)}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    borderRadius: "12px",
    background: "#f5f7fa",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "20px auto"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  section: {
    marginBottom: "20px"
  },
  slider: {
    width: "100%",
    marginTop: "10px"
  },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #ddd"
  }
};