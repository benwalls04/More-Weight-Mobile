import React, { useState, useContext, useEffect } from "react";
import { useUserContext } from "./UserContext";
export const WorkoutContext = React.createContext();
import { MOVEMENTS } from "@/constants/Movements";
import getSubList from "@/functions/getSubsList";

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

  const { routine, info, logSet, getTargets } = useUserContext();
  const exp = info.exp;
  const numSets = info.sets;

  const [time, setTime] = useState(timeRef.current);
  const [timerInterval, setTimerInterval] = useState(null);
  const [weightExp, setWeightExp] = useState(0);
  const [repsExp, setRepsExp] = useState(0);
  
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

  const [workoutFlag, setWorkoutFlag] = useState(workoutFlagRef.current);

  useEffect(() => {
    workoutFlagRef.current = workoutFlag;
  }, [workoutFlag]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const startWorkout = () => {
    setWorkoutFlag(true);
    setTime(0)
    setSubList(getSubOptions(routine[dayIndex].movements[0].movement));
  }

  const doNext = () => {
    let { ...newWorkout } = workoutCpy;
    const movedSets = newWorkout.sets.slice(index, index + numSets);
    newWorkout.sets.splice(index, numSets);
    newWorkout.sets.splice(index + numSets, 0, ...movedSets);
    
    const oldMovement = newWorkout.movements.slice(movementIndex, movementIndex + 1);
    newWorkout.movements.splice(movementIndex, 1);
    newWorkout.movements.splice(movementIndex + 1, 0, ...oldMovement);

    setCurrMovement(newWorkout.movements[movementIndex].movement);

    setWorkoutCpy(newWorkout);
  }

  const doLast = () => {
    let { ...newWorkout } = workoutCpy;
    const movedSets = newWorkout.sets.slice(index, index + numSets);
    newWorkout.sets.splice(index, numSets);
    newWorkout.sets.splice(workoutCpy.sets.length, 0, ...movedSets);

    const oldMovement = newWorkout.movements.slice(movementIndex, movementIndex + 1);

    newWorkout.movements.splice(movementIndex, 1);
    newWorkout.movements.splice(workoutCpy.movements.length, 0, ...oldMovement);
    setCurrMovement(newWorkout.movements[movementIndex].movement);

    setWorkoutCpy(newWorkout);
  }

  const [subList, setSubList] = useState([]);
  const nextSet = (skippedSet = false, weight, reps) => {
    if (index < workoutCpy.sets.length - 1) {
      if (!skippedSet) {
        logSet(currMovement, weight, reps);
        setWeightExp(weight);
        setRepsExp(reps);
        setTime(workoutCpy.sets[index].rest);
        startTimer(workoutCpy.sets[index].rest);
      } 
      setIndex(index + 1);
      setSetNum(setNum + 1);
      
      const newMovement = workoutCpy.sets[index + 1].movement;
      if (newMovement !== currMovement) {
        setCurrMovement(newMovement);
        setMovementIndex(movementIndex + 1);
        setSubList(getSubOptions(newMovement));
        setSetNum(1);
        const [targetWeight, targetReps] = getTargets(newMovement)
        setWeightExp(targetWeight);
        setRepsExp(targetReps);
      }

    } else {
      setWorkoutFlag(false);
    }
  }

  const substitute = (oldMovement, newMovement) => {
    let { ...newWorkout } = workoutCpy;
    
    const RPESeq = MOVEMENTS[newMovement].sequences[exp].slice(4 - numSets, 4);
    const bias = MOVEMENTS[newMovement].biasOrder.includes(oldMovement.bias)? oldMovement.bias : MOVEMENTS[newMovement].biasOrder.includes('n')? 'n': MOVEMENTS[newMovement].biasOrder[0]; 

    for (let i = 0; i < numSets; i++){
      let set = newWorkout.sets[index + i];
      set.bias = bias;
      set.movement = newMovement;
      set.RPE = RPESeq[i];
      set.rest = workoutCpy.sets[index + i].rest <= 1? 1 : set.rest;
      set.num = i + 1;
      set.lowerRep = workoutCpy.sets[index + i].lowerRep;
      set.upperRep = workoutCpy.sets[index + i].upperRep;
      newWorkout.sets[index + i] = set;
    }

    const newMovementObj = {
      movement: newMovement,
      bias: bias,
      RPE: RPESeq,
      lowerRep: workoutCpy.sets[index].lowerRep,
      upperRep: workoutCpy.sets[index].upperRep,
    }
    
    newWorkout.movements[movementIndex] = newMovementObj;

    setCurrMovement(newWorkout.movements[movementIndex].movement);

    setWorkoutCpy(newWorkout);
  }

  const getSubOptions = (movement) => {
    const title = routine[dayIndex].title;
    const movements = workoutCpy.movements;
    const accessories = info.accessories;

    return getSubList(title, movements, movement, accessories);
  }

  const [workoutCpy, setWorkoutCpy] = useState(routine[dayIndex]);
  const [currMovement, setCurrMovement] = useState(workoutCpy.sets[index].movement);
  const [movementIndex, setMovementIndex] = useState(0);
  const [setNum, setSetNum] = useState(1);

  const workoutState = {
    workoutCpy: workoutCpy,
    dayName: dayName,
    index: index,
    currMovement: currMovement,
    time: time,
    workoutFlag: workoutFlag,
    setNum: setNum,
    weightExp: weightExp,
    repsExp: repsExp,
    doNext: doNext,
    doLast: doLast,
    nextSet: nextSet,
    subList: subList,
    startWorkout: startWorkout,
    substitute: substitute,
    numSets: numSets,
  }

  return (
    <WorkoutContext.Provider value={workoutState}>
      {children}
    </WorkoutContext.Provider>
  )
}

