import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const { itinerary } = useContext(AppContext);

  // 📍 Default center (India)
  const center = [20.5937, 78.9629];

  // 🧠 Convert itinerary to coordinates (dummy for now)
  const placesWithCoords = itinerary.map((place, index) => ({
    ...place,
    lat: 20.5937 + index * 2,   // fake positions
    lng: 78.9629 + index * 2
  }));

  // 📈 Route lines
  const routePositions = placesWithCoords.map(place => [place.lat, place.lng]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📍 Travel Map</h2>

      <MapContainer center={center} zoom={5} style={styles.map}>
        
        {/* 🌍 Map Tiles */}
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 Markers */}
        {placesWithCoords.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lng]}>
            <Popup>
              <strong>{place.name}</strong>
            </Popup>
          </Marker>
        ))}

        {/* 🔗 Route Line */}
        {routePositions.length > 1 && (
          <Polyline positions={routePositions} color="blue" />
        )}
      </MapContainer>
    </div>
  );
}

// 🎨 Styling
const styles = {
  container: {
    margin: "20px auto",
    maxWidth: "800px",
    padding: "10px",
    background: "#f5f7fa",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px"
  },
  map: {
    height: "400px",
    width: "100%",
    borderRadius: "10px"
  }
};