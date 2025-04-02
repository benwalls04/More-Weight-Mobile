import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useUserContext } from "@/hooks/UserContext";
import { MOVEMENTS } from "@/constants/Movements";
import { REST_TIMES } from "@/constants/RestTimes";
import axios from "axios";
import getSubList from "@/functions/getSubsList";
import updateRestTime from "@/functions/updateRestTime";
export const EditContext = React.createContext();

export function useEditContext() {
  const editState = useContext(EditContext);
  return editState;
}

const dayIndexRef = { current: (new Date().getDay() + 6) % 7 };

export function EditProvider({children}){
  const router = useRouter();
  const { routineCpy, setRoutineCpy, setRoutine, info, username, setLog, setRecents, splitTitle, allRoutines, setAllRoutines, newUser, setNewUser } = useUserContext();
  
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
    if (routineCpy.every(day => !day.movements.some(entry => entry.movement.includes("new movement")))){    
      await axios.post('http://192.168.1.253:3000/set-routine', {
        routine: {title: splitTitle, routine: routineCpy, numSets: NUM_SETS}, 
        username: username,
        updateActive: !newUser && allRoutines.some(routine => routine.title === splitTitle)
      }).then(response => {

        if (newUser) {
          setNewUser(false);
        }

        setAllRoutines(response.data.allRoutines);
        setLog(response.data.log.movements)
        setRecents(response.data.log.recents)
        setRoutine(routineCpy);

        router.replace("/(main)/(tabs)/WorkoutPage");
      }).catch(error => {
        console.error("Error updating routine:", error);
      })
    } else {
      Alert.alert("Incomplete Routine", "Please substitute all fields titled 'new movement' for a valid movement");
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

    const title = !movements.some(item => item.movement.includes("new movement"))? "new movement" : "new movement " + movements.reduce((acc, item) => {
      if (item.movement.includes("new movement")){
        acc += 1
      }
      return acc;
    }, 0);

    movements.splice(workoutIndex + 1, 0, {
      movement: title, 
      bias: 'neutral',
      RPE: Array(NUM_SETS).fill(0),
      lowerRep: 0, 
      upperRep: 0,
      stimulus: 0, 
    });
    newRoutine[dayIndexRef.current].movements = movements;

    const lastIndex = findLastIndex(sets, "movement", movement);

    for (let i = 0; i < NUM_SETS; i++){
      sets.splice(lastIndex + 1, 0, { movement: title, lowerRep: 0, upperRep: 0, RPE: 0, rest: 0, num: i + 1});
    }

    newRoutine[dayIndexRef.current].sets = sets;    

    updateRoutine(newRoutine[dayIndexRef.current]);
  }

  const removeMovement = (movement, bias) => {
    const newDay = [...routineCpy][dayIndexRef.current];
    let movements = newDay.movements;
    let sets = newDay.sets;

    const firstIndex = findFirstIndex(sets, "movement", movement);
    movements = movements.filter(mov => mov.movement !== movement || mov.bias !== bias);
    sets = sets.filter(set => set.movement !== movement);
    newDay.sets = sets;
    newDay.movements = movements;

    if (firstIndex > 0) {
      newDay.sets[firstIndex - 1].rest = updateRestTime(firstIndex - 1, sets);
    }  

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

      if (allSetsIndex > 0) {
        sets[allSetsIndex - 1].rest = updateRestTime(allSetsIndex - 1, sets);
      }
      if (allSetsIndex + NUM_SETS - 1 < sets.length) {
        sets[allSetsIndex + NUM_SETS - 1].rest = updateRestTime(allSetsIndex + NUM_SETS - 1, sets);
      }
      if (allSetsIndex - (NUM_SETS + 1) > 0){
        sets[allSetsIndex - (NUM_SETS + 1)].rest = updateRestTime(allSetsIndex - (NUM_SETS + 1), sets);
      }
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

      if (allSetsIndex > 0) {
        sets[allSetsIndex - 1].rest = updateRestTime(allSetsIndex - 1, sets);
      }
      if (allSetsIndex + NUM_SETS - 1 < sets.length) {
        sets[allSetsIndex + NUM_SETS - 1].rest = updateRestTime(allSetsIndex + NUM_SETS - 1, sets);
      }
      if (allSetsIndex - (NUM_SETS + 1) > 0) {
        sets[allSetsIndex - (NUM_SETS + 1)].rest = updateRestTime(allSetsIndex - (NUM_SETS + 1), sets);
      }

    }

    newDay.movements = movements;
    newDay.sets = sets;

    updateRoutine(newDay);
  }

  const [subChoice, setSubChoice] = useState(null);
  
  const changeMovement = (workoutIndex, newMovement, newBias) => {
    const newDay = [...routineCpy][dayIndexRef.current];
    let movements = newDay.movements;
    let sets = newDay.sets;
    
    const oldMovementObj = newDay.movements[workoutIndex]

    const RPESeq = MOVEMENTS[newMovement] ? MOVEMENTS[newMovement].sequences[EXP_ICON] : MOVEMENTS["default"].sequences[EXP_ICON];
    const lowerRep = oldMovementObj.movement.includes("new movement") ? 8 : oldMovementObj.lowerRep;
    const upperRep = oldMovementObj.movement.includes("new movement") ? 12: oldMovementObj.upperRep;

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
    for (let i = firstIndex; i < firstIndex + NUM_SETS; i++){
      if (sets[i].movement === oldMovementObj.movement){
        let restIndexer = lowerRep <= 10? lowerRep / 2 - 1 : 4;
        sets[i] = {
          movement: newMovement, RPE: RPESeq[count], rest: REST_TIMES[restIndexer][RPESeq[count] - 7], num: count + 1, bias: newBias, lowerRep: lowerRep, upperRep: upperRep
        }
        count++;
      }
    }

    sets[firstIndex + NUM_SETS - 1].rest = updateRestTime(firstIndex + NUM_SETS - 1, sets);
    if (firstIndex > 0) {
      sets[firstIndex - 1].rest = updateRestTime(firstIndex - 1, sets);
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

  const getSubOptions = (movement, bias, text) => {
    const title = routineCpy[dayIndexRef.current].title;
    const movements = routineCpy[dayIndexRef.current].movements;
    return getSubList(title, movements, text, ACCESSORIES, bias, movement);
  }

  const getSets = (movement) => {
    const sets = routineCpy[dayIndexRef.current].sets;
    const setsForMovement = sets.filter(set => set.movement === movement);
    
    return setsForMovement;
  }

  const editSets = (movement, editedSets) => {
    const newDay = [...routineCpy][dayIndexRef.current];
    let sets = newDay.sets;

    const firstIndex = findFirstIndex(sets, "movement", movement);
    for (let i = firstIndex; i < sets.length; i++){
      if (sets[i].movement === movement){
        sets[i] = editedSets[i - firstIndex];
      }
    }
    newDay.sets = sets;

    updateRoutine(newDay);
  }

  const changeRepRange = (workoutIndex, lowerRep, upperRep) => {
    const newDay = [...routineCpy][dayIndexRef.current];
    newDay.movements[workoutIndex].lowerRep = lowerRep;
    newDay.movements[workoutIndex].upperRep = upperRep;
    updateRoutine(newDay);
  }

  const maxIntensity = (sets) => {
    let lowerRep = sets[0].lowerRep;
    if (lowerRep > 12) {
      lowerRep = 12;
    }

    if (lowerRep < 4) {
      lowerRep = 4
    }

    const restTime = REST_TIMES[Math.floor((lowerRep) / 2) - 2][4]

    sets.forEach((set, index) => {
      if (!(index === sets.length - 1 || set.rest === 1)) {
        set.rest = restTime;
      }
      set.RPE = 10;
    })

    return sets;
  }

  const [maxed, setMaxed] = useState(Array(7).fill(false));
  const maxDay = () => {
    let newDay = [...routineCpy][dayIndexRef.current];
    newDay.movements.forEach(movement => {
      let firstSet = findFirstIndex(newDay.sets, "movement", movement.movement);
      let newSetChunk = maxIntensity(newDay.sets.slice(firstSet, firstSet + NUM_SETS));
      newSetChunk.forEach((set, index) => {
        newDay.sets[firstSet + index] = set;
      })
    })

    let newMaxed = [...maxed];
    newMaxed[dayIndexRef.current] = true;
    setMaxed(newMaxed);

    updateRoutine(newDay);
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
    subChoice,
    setSubChoice,
    getSets,
    editSets,
    changeRepRange,
    dayIndex,
    maxIntensity,
    maxDay,
    maxed,
    setDayIndex: setDayIndexWithRef,
  }

  return (
    <EditContext.Provider value={editState}>
      {children}
    </EditContext.Provider>
  );
}