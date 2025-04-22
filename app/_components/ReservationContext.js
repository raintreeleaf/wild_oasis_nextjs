"use client";
import { createContext, use, useContext, useState } from "react";

const ReservationContext = createContext();
const initialState = { from: undefined, to: undefined };
export function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
//use hook recommended in react 19
export function useReservation() {
  const context = use(ReservationContext);
  if (!context) return new Error("Context was used outside provider");
  return context;
}
