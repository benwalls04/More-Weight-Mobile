import React, { useState, useContext, useEffect } from "react";
import { useUserContext } from "./UserContext";
export const WorkoutContext = React.createContext();

const dayIndex = (new Date().getDay() - 1) % 7;
const dayName = new Date().toLocaleDateString('en-US', { 
  weekday: 'long',
  month: 'long',
  day: 'numeric'
}).replace(',', '').replace(' ', ', ');

const timeRef = { current: -Infinity };
const indexRef = { current: 0 };
const workoutFlagRef = { current: false };

export function useWorkoutContext() {
  const workoutState = useContext(WorkoutContext);

  if (workoutState === undefined) {
    throw new Error("useWorkoutContext must be used within an WorkoutProvider");
  }

  return workoutState;
}

export function WorkoutProvider({children}) {

  const { routine } = useUserContext();

  const [time, setTime] = useState(timeRef.current);
  const [timerInterval, setTimerInterval] = useState(null);
  
  useEffect(() => {
    timeRef.current = time;
  }, [time]);
  
  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  const startTimer = (initialTime) => {
    if (timerInterval) clearInterval(timerInterval);
    
    setTime(initialTime);
    
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0.0167) { // Less than 1 second
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1/60;
      });
    }, 1000);
    
    setTimerInterval(interval);
  };

  const setTimeWithRef = (newTime) => {
    timeRef.current = newTime;
    setTime(newTime);
    if (newTime > 0) {
      startTimer(newTime);
    }
  };

  const [workoutFlag, setWorkoutFlag] = useState(workoutFlagRef.current);

  useEffect(() => {
    workoutFlagRef.current = workoutFlag;
  }, [workoutFlag]);

  const setWorkoutFlagWithRef = (newWorkoutFlag) => {
    workoutFlagRef.current = newWorkoutFlag;
    setWorkoutFlag(newWorkoutFlag);
  };

  const [index, setIndex] = useState(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const setIndexWithRef = (newIndex) => {
    indexRef.current = newIndex;
    setIndex(newIndex);
  };

  const [workoutCpy, setWorkoutCpy] = useState(routine[dayIndex]);
  const [currMovement, setCurrMovement] = useState(workoutCpy.sets[index].movement);
  const [setNum, setSetNum] = useState(1);

  const workoutState = {
    workoutCpy: workoutCpy,
    dayName: dayName,
    index: index,
    setIndex: setIndexWithRef,
    currMovement: currMovement,
    setCurrMovement: setCurrMovement,
    time: time,
    workoutFlag: workoutFlag,
    setWorkoutFlag: setWorkoutFlagWithRef,
    setTime: setTimeWithRef,
    setNum: setNum,
    setSetNum: setSetNum,
  }

  return (
    <WorkoutContext.Provider value={workoutState}>
      {children}
    </WorkoutContext.Provider>
  )
}

