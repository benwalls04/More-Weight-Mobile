import React, { useState, useContext, useEffect } from "react";
import { useUserContext } from "@/hooks/UserContext";
import { useRouter } from "expo-router";
import { MOVEMENTS } from "@/constants/Movements";
import axios from "axios";

export const EditContext = React.createContext();

export function useEditContext() {
  const editState = useContext(EditContext);
  return editState;
}

export function EditProvider({children}){
  const router = useRouter();
  const { routine, setRoutine, info } = useUserContext();
  const [tmpRoutine, setTmpRoutine] = useState([]);

  useEffect(() => {
    setTmpRoutine(routine)
  }, [routine])

  const NUM_SETS = info.numSets;
  const EXP_ICON = info.exp;
  const ACCESSORIES = info.accessories;

  const finish = async () => {
    setRoutine(tmpRoutine);
    //router.push("/");
  }

  const updateRoutine = (newDay, dayIndex) => {
    const newRoutine = [...tmpRoutine];
    newRoutine[dayIndex] = newDay;
    setTmpRoutine(newRoutine);
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
    const newRoutine = [...tmpRoutine];
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
    
    setTmpRoutine(newRoutine);
  }

  const removeMovement = (dayIndex, movement) => {
    const newDay = [...tmpRoutine][dayIndex];
    let movements = newDay.movements;
    let sets = newDay.sets;

    movements = movements.filter(mov => mov.movement !== movement);
    sets = sets.filter(set => set.movement !== movement);
    newDay.sets = sets;
    newDay.movements = movements;
    updateRoutine(dayIndex, newDay);
  }

  const moveUp = (dayIndex, workoutIndex, movement) => {
    const newDay = [...tmpRoutine][dayIndex];
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
    const newDay = [...tmpRoutine][dayIndex];
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
    const newDay = [...tmpRoutine][dayIndex];
    let movements = newDay.movements;
    let sets = newDay.sets;

    // get info for the new movement 
    const RPESeq = MOVEMENTS[newMovement].sequences[EXP_ICON];
    const lowerRep = oldMovement.movement === "new movement"? 8 : oldMovement.lowerRep;
    const upperRep = oldMovement.movement === "new movement"? 12: oldMovement.upperRep;
    const newBias = MOVEMENTS[newMovement].biasOrder.includes(oldMovement.bias)? oldMovement.bias : MOVEMENTS[newMovement].biasOrder.includes('neutral')? 'neutral': MOVEMENTS[newMovement].biasOrder[0];

    // update movements array
    // FIXME: stimulus is not accurate 
    movements[workoutIndex] = {
      movement: newMovement, 
      bias: newBias,
      RPE: RPESeq, 
      lowerRep: lowerRep,
      upperRep: upperRep,
      stimilus: oldMovement.stimulus, 
    };
    newDay.movements = movements;

    // update allSets array
    // FIXME: last rest is not updated individually 
    const firstIndex = findFirstIndex(sets, "movement", oldMovement.movement);
    let count = 0;
    for (let i = firstIndex; i < sets.length; i++){
      if (sets[i].movement === oldMovement.movement){
        sets[i] = {
          movement: newMovement, RPE: RPESeq[count], rest: restTimes[lowerRep / 2 - 1][RPESeq[count] - 7], num: count + 1, bias: newBias, lowerRep: lowerRep, upperRep: upperRep
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
    const newDay = {...tmpRoutine}[dayIndex];
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
    const title = tmpRoutine[dayIndex].title
    const movements = tmpRoutine[dayIndex].movements
    let options = [];
    
    for (let name in MOVEMENTS) {
      if (!movements.some(entry => entry.movement === name) && (title.includes(MOVEMENTS[name].primary) || ACCESSORIES.includes(MOVEMENTS[name].primary) && name.includes(text))) {
        options.push(name)
      }
    }

    return options;
  }

  const editState = {
    tmpRoutine: tmpRoutine,
    finish: finish,
    updateRoutine: updateRoutine,
    changeMovement: changeMovement,
    changeBias: changeBias,
    addMovement: addMovement,
    removeMovement: removeMovement,
    moveUp: moveUp,
    moveDown: moveDown,
    getSubOptions: getSubOptions,
  }

  return (
    <EditContext.Provider value={editState}>
      {children}
    </EditContext.Provider>
  )
}