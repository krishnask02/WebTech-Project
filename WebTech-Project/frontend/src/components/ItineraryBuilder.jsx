import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

export default function ItineraryBuilder() {
  const { itinerary, setItinerary } = useContext(AppContext);

  const addPlace = () => {
    const placeName = prompt("Enter place name:");

    if (!placeName || !placeName.trim()) return;

    const trimmedName = placeName.trim();

    const alreadyExists = itinerary.some(
      (item) => item.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      alert("This place is already in your itinerary");
      return;
    }

    const newPlace = {
      id: Date.now().toString(),
      name: trimmedName
    };

    setItinerary([...itinerary, newPlace]);
  };

  const removePlace = (id) => {
    const updated = itinerary.filter((item) => item.id !== id);
    setItinerary(updated);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(itinerary);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    setItinerary(items);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🗺️ Itinerary Builder</h2>
      <p style={styles.subheading}>
        Add, remove, and reorder places for your trip plan
      </p>

      <button onClick={addPlace} style={styles.addBtn}>
        + Add Place
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="itinerary">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={styles.list}
            >
              {itinerary.length === 0 && (
                <p style={styles.emptyText}>No places added yet 🚫</p>
              )}

              {itinerary.map((place, index) => (
                <Draggable
                  key={place.id}
                  draggableId={place.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...styles.item,
                        ...provided.draggableProps.style
                      }}
                    >
                      <span style={styles.placeText}>
                        {index + 1}. {place.name}
                      </span>

                      <button
                        onClick={() => removePlace(place.id)}
                        style={styles.deleteBtn}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f5f7fa",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "20px auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "8px",
    color: "#1f2937"
  },
  subheading: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#6b7280"
  },
  addBtn: {
    display: "block",
    margin: "10px auto",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    background: "#4CAF50",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  },
  list: {
    marginTop: "20px"
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  placeText: {
    color: "#111827",
    fontWeight: "500"
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};