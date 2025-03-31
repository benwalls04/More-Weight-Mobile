import { REST_TIMES } from "@/constants/RestTimes";
import { MOVEMENTS } from "@/constants/Movements";

export default function updateRestTime(index, sets) {
  let restTime = 0;

  let lowerRep = sets[index].lowerRep

  if (lowerRep > 12) {
    lowerRep = 12;
  }

  if (lowerRep < 4) {
    lowerRep = 4
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
    restTime = REST_TIMES[Math.floor((lowerRep) / 2) - 2][RPE - 7];
  } else {
    restTime = 1;
  }

  return restTime;
}
