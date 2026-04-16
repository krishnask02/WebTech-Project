import { createContext, useState } from "react";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [budget, setBudget] = useState(5000);
  const [comfort, setComfort] = useState(3);
  const [places, setPlaces] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [expenses, setExpenses] = useState({
    stay: 0,
    food: 0,
    travel: 0,
    other: 0
  });

  return (
    <AppContext.Provider
      value={{
        budget,
        setBudget,

        comfort,
        setComfort,

        places,
        setPlaces,

        itinerary,
        setItinerary,

        expenses,
        setExpenses
      }}
    >
      {children}
    </AppContext.Provider>
  );
};