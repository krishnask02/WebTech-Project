import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function RecommendationPanel() {
  const { budget, comfort, itinerary, setItinerary } = useContext(AppContext);
  const [recommended, setRecommended] = useState([]);

  const places = [
    {
      id: "1",
      name: "Goa Beach",
      rating: 4.5,
      price: 5000,
      img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: "2",
      name: "Manali Hills",
      rating: 4.7,
      price: 4000,
      img: "https://images.unsplash.com/photo-1565027456627-5aa7d07b95a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuYWxpJTIwaGlpbHN8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: "3",
      name: "Jaipur Palace",
      rating: 4.3,
      price: 3000,
      img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "4",
      name: "Kerala Backwaters",
      rating: 4.8,
      price: 6000,
      img: "https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2VyZWxhfGVufDB8fDB8fHww"
    },
    {
      id: "5",
      name: "Rishikesh",
      rating: 4.6,
      price: 3500,
      img: "https://plus.unsplash.com/premium_photo-1697730398251-40cd8dc57e0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmlzaGlrZXNofGVufDB8fDB8fHww"
    },
    {
      id: "6",
      name: "Ladakh",
      rating: 4.9,
      price: 7000,
      img: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFkYWtofGVufDB8fDB8fHww"
    },
    {
      id: "7",
      name: "Mumbai City",
      rating: 4.2,
      price: 4500,
      img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVtYmFpfGVufDB8fDB8fHww"
    },
    {
      id: "8",
      name: "Delhi",
      rating: 4.1,
      price: 3000,
      img: "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVsaGl8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: "9",
      name: "Andaman Islands",
      rating: 4.8,
      price: 8000,
      img: "https://images.unsplash.com/photo-1586359716568-3e1907e4cf9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5kYW1hbiUyMGlzbGFuZHN8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: "10",
      name: "Udaipur",
      rating: 4.7,
      price: 4000,
      img: "https://plus.unsplash.com/premium_photo-1661964079694-ccfaf7dc8028?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dWRhaXB1cnxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  const calculateScore = (place) => {
    return (
      place.rating * 0.5 +
      (budget >= place.price ? 1 : 0.5) +
      (comfort >= 3 ? 1 : 0.5)
    );
  };

  useEffect(() => {
    const sorted = [...places].sort(
      (a, b) => calculateScore(b) - calculateScore(a)
    );
    setRecommended(sorted.slice(0, 8));
  }, [budget, comfort]);

  const addToItinerary = (place) => {
    const alreadyExists = itinerary.some((item) => item.name === place.name);

    if (alreadyExists) {
      alert("This place is already in your itinerary");
      return;
    }

    setItinerary((prev) => [
      ...prev,
      { id: Date.now().toString(), name: place.name }
    ]);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Recommended Destinations</h2>
      <p style={styles.subheading}>
        Swipe through suggestions based on your budget and comfort preference
      </p>

      <div style={styles.carousel}>
        {recommended.map((place) => (
          <div key={place.id} style={styles.card}>
            <img src={place.img} alt={place.name} style={styles.image} />

            <div style={styles.content}>
              <h3 style={styles.title}>{place.name}</h3>
              <p style={styles.text}>⭐ {place.rating}</p>
              <p style={styles.text}>₹ {place.price}</p>

              <button
                style={styles.button}
                onClick={() => addToItinerary(place)}
              >
                Add to Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "10px 0"
  },
  heading: {
    textAlign: "center",
    marginBottom: "8px",
    color: "#1f2937"
  },
  subheading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#6b7280"
  },
  carousel: {
    display: "flex",
    gap: "18px",
    overflowX: "auto",
    padding: "8px 4px 14px",
    scrollBehavior: "smooth"
  },
  card: {
    minWidth: "240px",
    maxWidth: "240px",
    flex: "0 0 auto",
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover"
  },
  content: {
    padding: "14px"
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "18px",
    color: "#111827"
  },
  text: {
    margin: "4px 0",
    color: "#4b5563"
  },
  button: {
    marginTop: "12px",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#7c3aed",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  }
};