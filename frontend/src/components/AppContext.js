import React, { createContext, useState, useEffect } from 'react';

// Create context
const AppContext = createContext();

// Provider component
const AppProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState({}); // Define your shared state here

  // Load data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('sharedState');
    if (storedData) {
      setSharedState(JSON.parse(storedData));
    }
  }, []);

  // Save data to local storage whenever sharedState changes
  useEffect(() => {
    localStorage.setItem('sharedState', JSON.stringify(sharedState));
  }, [sharedState]);

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume context
const useAppContext = () => React.useContext(AppContext);

export { AppProvider, useAppContext };
