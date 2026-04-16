import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

export default function Dashboard() {
  const { budget, comfort, itinerary } = useContext(AppContext);

  const expenseData = [
    { name: "Stay", value: budget * 0.4 },
    { name: "Food", value: budget * 0.3 },
    { name: "Travel", value: budget * 0.2 },
    { name: "Other", value: budget * 0.1 }
  ];

  const trendData = [
    { day: "Day 1", spend: 1000 },
    { day: "Day 2", spend: 1500 },
    { day: "Day 3", spend: 1200 },
    { day: "Day 4", spend: 1800 }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}></h2>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Budget</h3>
          <p>₹{budget}</p>
        </div>

        <div style={styles.card}>
          <h3> Places Added</h3>
          <p>{itinerary.length}</p>
        </div>

        <div style={styles.card}>
          <h3>Estimated Remaining</h3>
          <p>₹{Math.floor(budget * 0.3)}</p>
        </div>
      </div>

      <div style={styles.charts}>
        
        <div style={styles.chartBox}>
          <h3>Expense Breakdown</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={expenseData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {expenseData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div style={styles.chartBox}>
          <h3>Spending Trend</h3>
          <LineChart width={400} height={300} data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="spend" stroke="#8884d8" />
          </LineChart>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f8fafc",
    minHeight: "100vh"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  cards: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "30px",
    flexWrap: "wrap"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "200px",
    margin: "10px"
  },
  charts: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  chartBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    margin: "10px"
  }
};