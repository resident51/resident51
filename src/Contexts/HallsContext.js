import React, { createContext, useState } from 'react';

export const HallsContext = createContext();

export const HallsProvider = props => {
  const defaultHalls = [
    "Battenfeld",
    "Douthart",
    "Grace Pearson",
    "KK Amini",
    "Krehbiel",
    "Margaret Amini",
    "Miller",
    "Pearson",
    "Rieger",
    "Sellards",
    "Stephenson",
    "Watkins"
  ];

  const [halls, setHalls] = useState(defaultHalls)

  return (
    <HallsContext.Provider value={{ halls, setHalls }}>
      {props.children}
    </HallsContext.Provider>
  )
};