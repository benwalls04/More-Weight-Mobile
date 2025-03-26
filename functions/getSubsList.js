import { MOVEMENTS } from "@/constants/Movements";

export default function getSubList(title, movements, text, accessories, bias=null, prevMovement=null) {
  let options = [];
  
  const possibleSubs = Object.entries(MOVEMENTS).filter(([movement, data]) => {
    return (title.includes(data.primary) || accessories.includes(data.primary)) && movement.includes(text)
  })

  if (prevMovement && prevMovement !== "new movement") {
    const primary = MOVEMENTS[prevMovement].primary
    const secondary = MOVEMENTS[prevMovement].secondary

    for (let obj of possibleSubs) {
      if (obj[1].primary == primary) {
        for (let [varBias, biasText] of Object.entries(obj[1]["variants"])) {
          const name = (biasText + " " + obj[0]).trim();
          if (!options.some(option => option.variant === name) && varBias == bias) {
            options.push({
              bias: varBias,
              variant: name,
              baseMovement: obj[0]
            })
          }
        }
      }
    }

    for (let obj of possibleSubs) {
      if (obj[1].primary == primary) {
        for (let [varBias, biasText] of Object.entries(obj[1]["variants"])) {
          const name = (biasText + " " + obj[0]).trim();
          if (!options.some(option => option.variant === name)) {
            options.push({
              bias: varBias,
              variant: name,
              baseMovement: obj[0]
            })
          }
        }
      }
    }

    // primary = secondary at some point 
    for (let obj of possibleSubs) {
      if (obj[1].secondary.includes(primary) || secondary.includes(obj[1].primary)) {
        for (let [varBias, biasText] of Object.entries(obj[1]["variants"])) {
          const name = (biasText + " " + obj[0]).trim();
          if (!options.some(option => option.variant === name)) {
            options.push({
              bias: varBias,
              variant: name,
              baseMovement: obj[0]
            })
          }
        }
      }
    }
  }

  for (let obj of possibleSubs) {
    for (let [varBias, biasText] of Object.entries(obj[1]["variants"])) {
      const name = (biasText + " " + obj[0]).trim();
      if (!options.some(option => option.variant === name)) {
        options.push({
          bias: varBias,
          variant: name,
          baseMovement: obj[0]
        })
      }
    }
  }

  // FIXME: include the variant information in the movements list to avoid excessive search
  options = options.filter(option => !movements.some(movement => {
    if (movement.movement === "new movement") {
      return false;
    }
    
    const movBiasText = MOVEMENTS[movement.movement].variants[movement.bias]
    return option.variant === (movBiasText + " " + movement.movement).trim()
  }))

  return options;
}