import { MOVEMENTS } from "@/constants/Movements";
import MOVEMENT_ORDER from "@/constants/MovementOrder";

export default function getSubList(title, movements, text, accessories, byVariants=false, bias=null) {
  let options = [];
  
  if (!byVariants) {
    possibleSubs = MOVEMENTS.filter(movement => {
      return !movements.some(entry => entry.movement === movement) && (title.includes(MOVEMENTS[movement].primary) || accessories.includes(MOVEMENTS[movement].primary) && movement.includes(text))
    })

    for (let name in possibleSubs) {
      if (!options.includes(name) && bias in MOVEMENTS[name].variants) {
        options.push(name)
      }
    }

    for (let name in possibleSubs) {
      if (!options.includes(name)) {
        options.push(name)
      }
    }

    // try to use movement order
  } else {

  }

  return options;
}