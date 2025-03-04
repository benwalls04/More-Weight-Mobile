import React, { useState, useEffect,useContext } from "react";
import { useRouter } from "expo-router";
import { useUserContext } from "@/hooks/UserContext";
import { MOVEMENTS } from "@/constants/Movements";
import { REST_TIMES } from "@/constants/RestTimes";
export const EditContext = React.createContext();

export function useEditContext() {
  const editState = useContext(EditContext);
  return editState;
}

const globalDayIndexRef = { current: 0 };
const router = useRouter();

export function EditProvider({children}){
  const { routineCpy, setRoutineCpy, setRoutine, info } = useUserContext();
  
  const [dayIndex, setDayIndex] = useState(globalDayIndexRef.current);
  
  // Update the global ref when dayIndex changes
  useEffect(() => {
    globalDayIndexRef.current = dayIndex;
  }, [dayIndex]);
  
  // Custom setter that updates both state and global ref
  const setDayIndexWithRef = (newIndex) => {
    globalDayIndexRef.current = newIndex;
    setDayIndex(newIndex);
  };
  
  const NUM_SETS = info.numSets;
  const EXP_ICON = info.exp;
  const ACCESSORIES = info.accessories;
  

  const finish = async () => {
    setRoutine(routineCpy);
    router.push("/(main)/(tabs)/Workout");
  }

  const updateRoutine = (newDay, dayIndex) => {
    const newRoutine = [...routineCpy];
    newRoutine[dayIndex] = newDay;
    setRoutineCpy(newRoutine);
  }

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

  const addMovement = (dayIndex, workoutIndex, movement) => {
    const newRoutine = [...routineCpy];
    let movements = newRoutine[dayIndex].movements;
    let sets = newRoutine[dayIndex].sets;

    movements.splice(workoutIndex + 1, 0, {
      movement: "new movement", 
      bias: 'neutral',
      RPE: [0, 0, 0],
      lowerRep: 0, 
      upperRep: 0,
      stimulus: 0, 
    });
    newRoutine[dayIndex].movements = movements;

    const lastIndex = findLastIndex(sets, "movement", movement);
    for (let i = 0; i < NUM_SETS; i++){
      sets.splice(lastIndex + 1, 0, { movement: "new movement", lowerRep: 0, upperRep: 0, RPE: 0, rest: 0, num: i + 1});
    }
    newRoutine[dayIndex].sets = sets;
    
    updateRoutine(dayIndex, newRoutine);
  }

  const removeMovement = (dayIndex, movement) => {
    const newDay = [...routineCpy][dayIndex];
    let movements = newDay.movements;
    let sets = newDay.sets;

    movements = movements.filter(mov => mov.movement !== movement);
    sets = sets.filter(set => set.movement !== movement);
    newDay.sets = sets;
    newDay.movements = movements;
    updateRoutine(dayIndex, newDay);
  }

  const moveUp = (dayIndex, workoutIndex, movement) => {
    const newDay = [...routineCpy][dayIndex];
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

    updateRoutine(dayIndex, newDay);
  }

  const moveDown = (dayIndex, workoutIndex, movement) => {
    const newDay = [...routineCpy][dayIndex];
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

    updateRoutine(dayIndex, newDay);
  }

  const changeMovement = (dayIndex, workoutIndex, oldMovement, newMovement) => {
    const newDay = [...routineCpy][dayIndex];
    let movements = newDay.movements;
    let sets = newDay.sets;
    // get info for the new movement 
    const oldMovementObj = newDay.movements[workoutIndex]

    const RPESeq = MOVEMENTS[newMovement].sequences[EXP_ICON];
    const lowerRep = oldMovementObj.movement === "new movement"? 8 : oldMovementObj.lowerRep;
    const upperRep = oldMovementObj.movement === "new movement"? 12: oldMovementObj.upperRep;
    const newBias = MOVEMENTS[newMovement].biasOrder.includes(oldMovementObj.bias)? oldMovementObj.bias : MOVEMENTS[newMovement].biasOrder.includes('neutral')? 'neutral': MOVEMENTS[newMovement].biasOrder[0];

    // update movements array
    // FIXME: stimulus is not accurate 
    movements[workoutIndex] = {
      movement: newMovement, 
      bias: newBias,
      RPE: RPESeq, 
      lowerRep: lowerRep,
      upperRep: upperRep,
      stimilus: oldMovementObj.stimulus, 
    };
    newDay.movements = movements;

    // update allSets array
    // FIXME: last rest is not updated individually 
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

    // FIXME: make this a response in the workout info component 
    //setShowSubs(false);
    //setSubText(newMovement);
    updateRoutine(dayIndex, newDay);
  }

  const changeBias = (dayIndex, workoutIndex, movement, newBias) => {
    const newDay = {...routineCpy}[dayIndex];
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

    updateRoutine(dayIndex, newDay);
  }

  const getSubOptions = (dayIndex, text) => {

    const title = routineCpy[dayIndex].title

    const movements = routineCpy[dayIndex].movements
    let options = [];
    
    // FIXME: order the subs by relevance 
    for (let name in MOVEMENTS) {
      if (!movements.some(entry => entry.movement === name) && (title.includes(MOVEMENTS[name].primary) || ACCESSORIES.includes(MOVEMENTS[name].primary) && name.includes(text))) {
        options.push(name)
      }
    }

    for (let name in MOVEMENTS) {
      if (movements.some(entry => entry.movement === name) && (title.includes(MOVEMENTS[name].primary) || ACCESSORIES.includes(MOVEMENTS[name].primary) && name.includes(text))) {
        options.push(name)
      }
    }

    return options;
  }

  const getSets = (dayIndex, movement) => {
    const sets = routineCpy[dayIndex].sets;
    const setsForMovement = sets.filter(set => set.movement === movement);
    return setsForMovement;
  }

  const editState = {
    finish: finish,
    updateRoutine: updateRoutine,
    changeMovement: changeMovement,
    changeBias: changeBias,
    addMovement: addMovement,
    removeMovement: removeMovement,
    moveUp: moveUp,
    moveDown: moveDown,
    getSubOptions: getSubOptions,
    getSets: getSets,
    dayIndex: dayIndex,
    setDayIndex: setDayIndexWithRef,
  }

  return (
    <EditContext.Provider value={editState}>
      {children}
    </EditContext.Provider>
  )
}