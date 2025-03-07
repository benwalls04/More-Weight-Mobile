import { MOVEMENTS } from "@/constants/Movements";

export default function getSubList(title, movements, text, accessories) {
  let options = [];
  
  for (let name in MOVEMENTS) {
    if (!movements.some(entry => entry.movement === name) && (title.includes(MOVEMENTS[name].primary) || accessories.includes(MOVEMENTS[name].primary) && name.includes(text))) {
      options.push(name)
    }
  }

  for (let name in MOVEMENTS) {
    if (movements.some(entry => entry.movement === name) && (title.includes(MOVEMENTS[name].primary) || accessories.includes(MOVEMENTS[name].primary) && name.includes(text))) {
      options.push(name)
    }
  }

  return options;
}