import React, { useState, useContext, useEffect } from "react";
import { useUserContext } from "./UserContext";
export const WorkoutContext = React.createContext();
import { MOVEMENTS } from "@/constants/Movements";
import getSubList from "@/functions/getSubsList";
import updateRestTime from "@/functions/updateRestTime";
import axios from "axios";

const dayIndex = (new Date().getDay() + 6) % 7;
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

  const { routine, info, logSet, getTargets, log, recents, username } = useUserContext();

  const [time, setTime] = useState(timeRef.current);
  const [timerInterval, setTimerInterval] = useState(null);
  const [weightExp, setWeightExp] = useState(0);
  const [repsExp, setRepsExp] = useState(0);
  const [complete, setComplete] = useState(false);

  const numSets = info.sets;
  const exp = info.exp;
  
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
    const firstMovement = routine[dayIndex].movements[0].movement;
    setSubList(getSubOptions(firstMovement));
    getTargets(firstMovement).then(([targetWeight, targetReps]) => {
      setWeightExp(targetWeight);
      setRepsExp(targetReps);
    })
  }

  useEffect(() => {
    setWorkoutCpy(routine[dayIndex]);
    setTime(0);
    setIndex(0);
    setWorkoutFlag(false);
  }, [routine])

  const doNext = () => {
    let { ...newWorkout } = workoutCpy;
    const movedSets = newWorkout.sets.slice(index, index + numSets);
    newWorkout.sets.splice(index, numSets);
    newWorkout.sets.splice(index + numSets, 0, ...movedSets);

    if (index + numSets - 1 < newWorkout.sets.length){
      newWorkout.sets[index + numSets - 1].rest = updateRestTime(index + numSets - 1, newWorkout.sets);
    }
    if (index + 2 * numSets - 1 < newWorkout.sets.length){
      newWorkout.sets[index + 2 * numSets - 1].rest = updateRestTime(index + 2 * numSets - 1, newWorkout.sets);
    }
    
    const oldMovement = newWorkout.movements.slice(movementIndex, movementIndex + 1);
    newWorkout.movements.splice(movementIndex, 1);
    newWorkout.movements.splice(movementIndex + 1, 0, ...oldMovement);

    const newMovement = newWorkout.movements[movementIndex].movement;
    setCurrMovement(newMovement);
    setSubList(getSubOptions(newMovement));

    setWorkoutCpy(newWorkout);
  }

  const doLast = () => {
    let { ...newWorkout } = workoutCpy;
    const movedSets = newWorkout.sets.slice(index, index + numSets);
    newWorkout.sets.splice(index, numSets);
    newWorkout.sets.splice(workoutCpy.sets.length, 0, ...movedSets);

    if (newWorkout.sets.length - (numSets + 1) > 0){
      newWorkout.sets[newWorkout.sets.length - (numSets + 1)].rest = updateRestTime(newWorkout.sets.length - (numSets + 1), newWorkout.sets);
    }

    const oldMovement = newWorkout.movements.slice(movementIndex, movementIndex + 1);

    newWorkout.movements.splice(movementIndex, 1);
    newWorkout.movements.splice(workoutCpy.movements.length, 0, ...oldMovement);

    const newMovement = newWorkout.movements[movementIndex].movement;
    setCurrMovement(newMovement);
    setSubList(getSubOptions(newMovement));

    setWorkoutCpy(newWorkout);
  }

  const [subList, setSubList] = useState([]);
  const nextSet = (skippedSet=false, bias, weight, reps, variant) => {
      if (index < workoutCpy.sets.length - 1) {
        if (!skippedSet) {
          setWeightExp(weight);
          setRepsExp(reps);
          setTime(workoutCpy.sets[index].rest);
          startTimer(workoutCpy.sets[index].rest);

          // update local copies 
          let newLog = {...logCpy};
          let newRecents = [...recentsCpy];

          if (newLog[variant]) {
            newLog[variant].push({weight: weight, reps: reps, baseMovement: currMovement, createdAt: new Date()});
          } else {
            newLog[variant] = [{weight: weight, reps: reps, baseMovement: currMovement, createdAt: new Date()}];
          }
          newRecents = newRecents.filter(movement => movement !== variant);
          newRecents.unshift(variant);

          setRecentsCpy(newRecents);
          setLogCpy(newLog);

          logSet(currMovement, weight, reps, variant);
        } 
          
        setIndex(index + 1);
        setSetNum(setNum + 1);
        
        const newMovement = workoutCpy.sets[index + 1].movement;
        const newBias = workoutCpy.sets[index + 1].bias;
        if (newMovement !== currMovement || newBias !== bias) {
          setCurrMovement(newMovement);
          setMovementIndex(movementIndex + 1);
          // FIXME: make sure subList updates for accessories, as well as on doNext and doLast clicks
          setSubList(getSubOptions(newMovement));
          setSetNum(1);
          getTargets(newMovement).then(([targetWeight, targetReps]) => {
            setWeightExp(targetWeight);
            setRepsExp(targetReps);
          })
        }

      } else {
        setComplete(true);
        setWorkoutFlag(false);
      }
  }

  const [addFlag, setAddFlag] = useState(false);
  const addMovement = () => {
    setAddFlag(true);
    let { ...newWorkout } = workoutCpy;

    // Create a new movement with default values
    const newMovement = {movement: "new movement", bias: "neutral", lowerRep: 8, upperRep: 12, stimulus: 0};
    
    newWorkout.movements.splice(movementIndex, 0, newMovement);

    // Create new sets for the new movement
    const newSets = [];
    for (let i = 0; i < numSets; i++){
      newSets.push({
        movement: "new movement", 
        bias: "neutral", 
        num: i + 1,
        lowerRep: 8, 
        upperRep: 12, 
        RPE: 10,
        rest: 2.5
      });
    }

    newWorkout.sets.splice(index, 0, ...newSets);

    setCurrMovement("new movement");
    setSubList(getSubList(routine[dayIndex].title, workoutCpy.movements, "", info.accessories, "neutral", "new movement"));
    setWorkoutCpy(newWorkout);
  }

  const [subChoice, setSubChoice] = useState({movement: "new movement", bias: "neutral"});
  const substitute = (dummy, newMovement, newBias) => {
    let { ...newWorkout } = workoutCpy;
    
    const RPESeq = MOVEMENTS[newMovement] ? MOVEMENTS[newMovement].sequences[exp].slice(4 - numSets, 4) : MOVEMENTS["default"].sequences[exp].slice(4 - numSets, 4);

    for (let i = 0; i < numSets; i++){
      let set = newWorkout.sets[index + i];
      set.bias = newBias;
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
      bias: newBias,
      RPE: RPESeq,
      lowerRep: workoutCpy.sets[index].lowerRep,
      upperRep: workoutCpy.sets[index].upperRep,
    }
    
    newWorkout.movements[movementIndex] = newMovementObj;

    setCurrMovement(newMovement);
    setSubList(getSubOptions(newMovement));
    setWorkoutCpy(newWorkout);
  }

  const getSubOptions = (movement) => {
    const title = routine[dayIndex].title;
    const movements = workoutCpy.movements;
    const accessories = info.accessories;
    const bias = workoutCpy.sets[index].bias;

    const biasText = MOVEMENTS[movement] ? MOVEMENTS[movement].variants[bias] : "";
    const variant = (movement + " " + biasText).trim();

    let newSubs = getSubList(title, movements, "", accessories, bias, movement);
    newSubs.unshift({baseMovement: movement, variant: variant, bias: bias});

    return newSubs;
  }

  const makeLogChanges = async (movement, baseMovement) => {
    try {
      const newLog = {...logCpy};
      
      for (const [index, value] of Object.entries(logChanges)) {
        newLog[movement][index].weight = Number(value.weight);
        newLog[movement][index].reps = Number(value.reps);
        
        await axios.post('http://localhost:3001/log-set', {
          username: username,
          movement: baseMovement,
          weight: Number(value.weight),
          reps: Number(value.reps),
          variant: movement,
          RPE: 10, 
          index: index
        });
      }
      
      setLogCpy(newLog);
      setLogChanges({});
      
      return true; 
    } catch (error) {
      console.error("Error updating log:", error);
      return false; 
    }
  }

  const [workoutCpy, setWorkoutCpy] = useState(routine[dayIndex]);
  const [currMovement, setCurrMovement] = useState(workoutCpy.sets[index] ? workoutCpy.sets[index].movement : null);
  const [movementIndex, setMovementIndex] = useState(0);
  const [setNum, setSetNum] = useState(1);
  const [recentsCpy, setRecentsCpy] = useState(recents);
  const [logCpy, setLogCpy] = useState(log);
  const [logChanges, setLogChanges] = useState({});

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
    complete: complete,
    doNext: doNext,
    doLast: doLast,
    nextSet: nextSet,
    addMovement: addMovement,
    addFlag: addFlag,
    setAddFlag: setAddFlag,
    subList: subList,
    startWorkout: startWorkout,
    substitute: substitute,
    subChoice: subChoice,
    setSubChoice: setSubChoice,
    numSets: numSets,
    recentsCpy: recentsCpy,
    logCpy: logCpy,
    logChanges: logChanges,
    setLogChanges: setLogChanges, 
    makeLogChanges: makeLogChanges,
  }

  return (
    <WorkoutContext.Provider value={workoutState}>
      {children}
    </WorkoutContext.Provider>
  )
}

