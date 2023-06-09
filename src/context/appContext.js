import React, { createContext, useState } from 'react';

// Create the user context
export const AppContext = createContext();

// Create a provider component for the user context
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notes,setNotes] = useState([])
  const [alert,setAlert] = useState(null)
  const [token,setToken] = useState(null)

  const login = (userData,token) => {
    // Perform login logic
    setUser(userData);
    console.log({t:token});
    setToken(token)
  };

  const logout = () => {
    // Perform logout logic
    setUser(null);
    setToken(null)
  };

  const addNotes = (note)=>{
    // setNotes(note)
  }

  const delNote = (note)=>{
    setNotes(note.filter((n)=>{n.id !== note}))
  }

  const fetchAllNotes = (notes)=>{
    setNotes(notes)
  }

  const setAlertMsg = (msg)=>{
    setAlert(msg)
  }

  // Define the value object that will be provided to the consumer components
  const value = {
    user,
    login,
    logout,
    notes,
    setAlertMsg,
    alert,
    fetchAllNotes,
    token,
    delNote
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
