import { MOVEMENTS } from "@/constants/Movements";
import { MOVEMENT_ORDER } from "@/constants/MovementOrder";

export default function getSubList(title, movements, text, accessories, bias=null, prevMovement=null) {
  let options = [];

  console.log(bias)
  console.log(prevMovement)
  console.log(movements)
  console.log(text)
  
  const possibleSubs = Object.entries(MOVEMENTS).filter(([movement, data]) => {
    return !movements.some(entry => entry.movement === movement) && (title.includes(data.primary) || accessories.includes(data.primary)) && movement.includes(text)
  }).map(([movement, data]) => movement)

  console.log(possibleSubs)

  if (prevMovement) {
    const primary = MOVEMENTS[prevMovement].primary
    const secondary = MOVEMENTS[prevMovement].secondary

    for (let name of possibleSubs) {
      if (!options.includes(name) && primary === MOVEMENTS[name].primary && bias in MOVEMENTS[name].variants) {
        options.push(name)
      }
    }

    for (let name of possibleSubs) {
      if (!options.includes(name) && MOVEMENTS[prevMovement].primary === MOVEMENTS[name].primary) {
        options.push(name)
      }
    }

    for (let name of possibleSubs) {
      if (!options.includes(name) && ((secondary && MOVEMENTS[name].primary in secondary) || (MOVEMENTS[name].secondary && primary in MOVEMENTS[name].secondary)) && bias in MOVEMENTS[name].variants) {
        options.push(name)
      }
    }

    for (let name of possibleSubs) {
      if (!options.includes(name) && ((secondary && MOVEMENTS[name].primary in secondary) || (MOVEMENTS[name].secondary && primary in MOVEMENTS[name].secondary))) {
        options.push(name)
      }
    }
  }

  for (let name of possibleSubs) {
    if (!options.includes(name) && bias in MOVEMENTS[name].variants) {
      options.push(name)
    }
  }

  for (let name of possibleSubs) {
    if (!options.includes(name)) {
      options.push(name)
    }
  }

  console.log(options)
  console.log("----------------")

  return options;
}