import React, { useState, useContext, useEffect } from "react";
import { useUserContext } from "./UserContext";
export const WorkoutContext = React.createContext();

export function useWorkoutContext() {
  const workoutState = useContext(WorkoutContext);

  if (workoutState === undefined) {
    throw new Error("useWorkoutContext must be used within an WorkoutProvider");
  }

  return workoutState;
}

export function WorkoutProvider({children}) {

  const { routineCpy, setRoutineCpy } = useUserContext();

  const dayIndex = (new Date().getDay() - 1) % 7;
  const dayName = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).replace(',', '').replace(' ', ', ');
  const [time, setTime] = useState(-Infinity);

  const workoutState = {
    routineCpy: routineCpy,
    setRoutineCpy: setRoutineCpy,
    dayIndex: dayIndex,
    dayName: dayName,
    time: time,
    setTime: setTime
  }

  return (
    <WorkoutContext.Provider value={workoutState}>
      {children}
    </WorkoutContext.Provider>
  )
}

