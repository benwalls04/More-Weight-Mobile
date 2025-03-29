import { REST_TIMES } from "@/constants/RestTimes";
import { MOVEMENTS } from "@/constants/Movements";

export default function updateRestTime(index, sets) {
  let restTime = 0;

  let lowerRep = sets[index].lowerRep
  if (lowerRep > 10) {
    lowerRep = 10;
  }

  let RPE = sets[index].RPE;
  if (RPE < 7){
    RPE = 7;
  }

  const currGroup = MOVEMENTS[sets[index].movement] ? MOVEMENTS[sets[index].movement].primary : "unknown group";
  let nextGroup = "unknown group";
  if (index + 1 < sets.length) {
    nextGroup = MOVEMENTS[sets[index + 1].movement] ? MOVEMENTS[sets[index + 1].movement].primary : "unknown group";
  }

  if (currGroup === nextGroup) {
    restTime = REST_TIMES[RPE - 7][lowerRep / 2 - 1];
  } else {
    restTime = 1;
  }

  return restTime;
}
