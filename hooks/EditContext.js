import React, { useState, useEffect, useContext } from "react";
import { useRouter, usePathname } from "expo-router";
import { useUserContext } from "@/hooks/UserContext";
import { MOVEMENTS } from "@/constants/Movements";
import { REST_TIMES } from "@/constants/RestTimes";
import axios from "axios";
import getSubList from "@/functions/getSubsList";

export const EditContext = React.createContext();

export function useEditContext() {
  const editState = useContext(EditContext);
  return editState;
}

const dayIndexRef = { current: 0 };

export function EditProvider({children}){
  const router = useRouter();
  const { routineCpy, setRoutineCpy, setRoutine, info, username, setLog, setRecents } = useUserContext();
  
  const [dayIndex, setDayIndex] = useState(dayIndexRef.current);
  
  useEffect(() => {
    dayIndexRef.current = dayIndex;
  }, [dayIndex]);
  
  const setDayIndexWithRef = (newIndex) => {
    dayIndexRef.current = newIndex;
    setDayIndex(newIndex);
  };

  const updateRoutine = (newDay) => {
    const newRoutine = [...routineCpy];
    newRoutine[dayIndexRef.current] = newDay;
    setRoutineCpy(newRoutine);
  }

  const finish = async () => {
    if (routineCpy.every(day => !day.movements.some(entry => entry.movement === "new movement"))){
      await axios.post('http://localhost:3001/set-routine', {routine: {title: "Routine 1", routine: routineCpy}, username: username}).then(response => {
        setLog(response.data.movements);
        setRecents(response.data.recents);
        setRoutine(routineCpy);
        router.replace("/(main)/(tabs)/WorkoutPage");
      }).catch(error => {
        console.log("error setting routine");
      })
    }
  }

  const NUM_SETS = info.sets;
  const EXP_ICON = info.exp;
  const ACCESSORIES = info.accessories;

  const findLastIndex = (array, key, value) => {
    return array.reduceRight((acc, item, index) => {
      if (acc === -1 && item[key] === value) {
        return index;
      }
      return acc;
    }, -1);
  };

  const findFirstIndex = (array, key, value) => {

    return array.reduce((acc, item, index) => {
      if (acc === -1 && item[key] === value) {
        return index;
      }
      return acc;
    }, -1);
  };

  const addMovement = (workoutIndex, movement) => {
    const newRoutine = [...routineCpy];
    let movements = newRoutine[dayIndexRef.current].movements;
    let sets = newRoutine[dayIndexRef.current].sets;

    movements.splice(workoutIndex + 1, 0, {
      movement: "new movement", 
      bias: 'neutral',
      RPE: [0, 0, 0],
      lowerRep: 0, 
      upperRep: 0,
      stimulus: 0, 
    });
    newRoutine[dayIndexRef.current].movements = movements;

    const lastIndex = findLastIndex(sets, "movement", movement);

    for (let i = 0; i < NUM_SETS; i++){
      sets.splice(lastIndex + 1, 0, { movement: "new movement", lowerRep: 0, upperRep: 0, RPE: 0, rest: 0, num: i + 1});
    }

    newRoutine[dayIndexRef.current].sets = sets;    
    updateRoutine(newRoutine[dayIndexRef.current]);
  }

  const removeMovement = (movement) => {
    const newDay = [...routineCpy][dayIndexRef.current];
    let movements = newDay.movements;
    let sets = newDay.sets;

    movements = movements.filter(mov => mov.movement !== movement);
    sets = sets.filter(set => set.movement !== movement);
    newDay.sets = sets;
    newDay.movements = movements;
    updateRoutine(newDay);
  }

  const moveUp = (workoutIndex, movement) => {
    const newDay = [...routineCpy][dayIndexRef.current];
    let movements = newDay.movements;
    let sets = newDay.sets;

    if (workoutIndex > 0){
      let temp = movements[workoutIndex]
      movements[workoutIndex] = movements[workoutIndex - 1];
      movements[workoutIndex - 1] = temp;

      const allSetsIndex = sets.findIndex(set => set.movement === movement)
      const removed = sets.splice(allSetsIndex, NUM_SETS);
      removed.forEach((set, indx) => {
        sets.splice(allSetsIndex - NUM_SETS + indx, 0, set)
      })
    }
    newDay.movements = movements;
    newDay.sets = sets;

    updateRoutine(newDay);
  }

  const moveDown = (workoutIndex, movement) => {
    const newDay = [...routineCpy][dayIndexRef.current];
    let movements = newDay.movements;
    let sets = newDay.sets;

    if (workoutIndex < movements.length - 1){
      let temp = movements[workoutIndex]
      movements[workoutIndex] = movements[workoutIndex + 1];
      movements[workoutIndex + 1] = temp;

      const allSetsIndex = sets.findIndex(set => set.movement === movement)
      const removed = sets.splice(allSetsIndex, NUM_SETS);
      removed.forEach((set, indx) => {
        sets.splice(allSetsIndex + NUM_SETS + indx, 0, set)
      })
    }

    newDay.movements = movements;
    newDay.sets = sets;

    updateRoutine(newDay);
  }

  const changeMovement = (workoutIndex, newMovement) => {
    const newDay = [...routineCpy][dayIndexRef.current];
    let movements = newDay.movements;
    let sets = newDay.sets;
    
    const oldMovementObj = newDay.movements[workoutIndex]

    const RPESeq = MOVEMENTS[newMovement].sequences[EXP_ICON];
    const lowerRep = oldMovementObj.movement === "new movement"? 8 : oldMovementObj.lowerRep;
    const upperRep = oldMovementObj.movement === "new movement"? 12: oldMovementObj.upperRep;
    const newBias = MOVEMENTS[newMovement].biasOrder.includes(oldMovementObj.bias)? oldMovementObj.bias : MOVEMENTS[newMovement].biasOrder.includes('neutral')? 'neutral': MOVEMENTS[newMovement].biasOrder[0];

    movements[workoutIndex] = {
      movement: newMovement, 
      bias: newBias,
      RPE: RPESeq, 
      lowerRep: lowerRep,
      upperRep: upperRep,
      stimilus: oldMovementObj.stimulus, 
    };

    newDay.movements = movements;

    const firstIndex = findFirstIndex(sets, "movement", oldMovementObj.movement);

    let count = 0;
    for (let i = firstIndex; i < sets.length; i++){
      if (sets[i].movement === oldMovementObj.movement){
        sets[i] = {
          movement: newMovement, RPE: RPESeq[count], rest: REST_TIMES[lowerRep / 2 - 1][RPESeq[count] - 7], num: count + 1, bias: newBias, lowerRep: lowerRep, upperRep: upperRep
        }
        count++;
      }
    }
    newDay.sets = sets;

    updateRoutine(newDay);
  }

  const changeBias = (workoutIndex, movement, newBias) => {
    const newDay = {...routineCpy}[dayIndexRef.current];
    let movements = newDay.movements;
    let sets = newDay.sets;

    movements[workoutIndex].bias = newBias;
    newDay.movements = movements;

    const firstIndex = findFirstIndex(sets, "movement", movement);
    for (let i = firstIndex; i < sets.length; i++){
      if (sets[i].movement === movement){
        sets[i].bias = newBias;
      }
    }
    newDay.sets = sets;

    updateRoutine(newDay);
  }

  const getSubOptions = (text) => {
    const title = routineCpy[dayIndexRef.current].title;
    const movements = routineCpy[dayIndexRef.current].movements;

    return getSubList(title, movements, text, ACCESSORIES);
  }

  const getSets = (movement) => {
    const sets = routineCpy[dayIndexRef.current].sets;
    const setsForMovement = sets.filter(set => set.movement === movement);
    return setsForMovement;
  }

  const editState = {
    finish,
    updateRoutine,
    changeMovement,
    changeBias,
    addMovement,
    removeMovement,
    moveUp,
    moveDown,
    getSubOptions,
    getSets,
    dayIndex,
    setDayIndex: setDayIndexWithRef,
  }

  return (
    <EditContext.Provider value={editState}>
      {children}
    </EditContext.Provider>
  );
}