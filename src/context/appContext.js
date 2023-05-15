import React, { createContext, useState } from 'react';

// Create the user context
export const AppContext = createContext();

// Create a provider component for the user context
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notes,setNotes] = useState([])

  const login = (userData) => {
    // Perform login logic
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic
    setUser(null);
  };

  const addNotes = ()=>{
    
  }

  // Define the value object that will be provided to the consumer components
  const value = {
    user,
    login,
    logout,
    notes
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
