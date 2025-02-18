
export const MOVEMENTS = {
  "barbell bench press": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": {
      neutral: 'flat', 
      "upper chest": 'incline',
      "lower chest": 'decline',
    }, 
    biasOrder: ['neutral', 'upper chest', 'lower chest']
  }, 
  "dumbell bench press": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "sequences": {
      "b": [7, 8, 8, 9],
      "i": [8, 8, 9, 9],
      "a": [8, 9, 9, 9]
    }, 
    "variants": {
      neutral: 'flat', 
      "upper chest": 'incline',
      "lower chest": 'decline',
    }, 
    biasOrder: ['upper chest', 'neutral', 'lower chest']
  }, 
  "smith machine bench press": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": {
      neutral: 'flat', 
      "upper chest": 'incline', 
      "lower chest": 'decline', 
    }, 
    biasOrder: ['upper chest', 'neutral', 'lower chest']
  }, 
  "machine chest press": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": {
      neutral: '', 
      "upper chest": 'low-to-high', 
      "lower chest": 'high-to-low', 
    }, 
    biasOrder: ['upper chest', 'neutral', 'lower chest']
  }, 
  "weighted dips": {
    "primary": "chest", 
    "secondary": ["triceps, shoulders"], 
    "sequences": {
      "b": [7, 8, 8, 9],
      "i": [8, 8, 9, 9],
      "a": [8, 9, 9, 9]
    }, 
    "variants": {
      "lower chest": '',
    }, 
    biasOrder: ['lower chest', 'lower chest', 'lower chest']
  }, 
  "cable fly": {
    "primary": "chest", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      neutral: '',
      "upper chest": 'low-to-high',
      "lower chest": 'high-to-low',
    }, 
    biasOrder: ['lower chest', 'neutral', 'upper chest']
  }, 
  "pec-dec fly": {
    "primary": "chest", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      neutral: ''
    }, 
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "cable press": {
    "primary": "chest", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      neutral: '', 
      "upper chest": 'low-to-high',
      "lower chest": 'high-to-low',
    },
    biasOrder: ['lower chest', 'neutral', 'upper chest']
  }, 
  "lat pulldown": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      neutral: '', 
      lats: 'narrow grip', 
      "upper back": 'wide grip',
    }, 
    biasOrder: ['neutral', 'lats', 'upper back']
  }, 
  "pull ups": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": {
      neutral: '',
      lats: 'underhand grip',
    },
    biasOrder: ['neutral', 'neutral', 'lats']
  }, 
  "seated cable row": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      neutral: '',
      "upper back": 'wide grip', 
      lats: 'narrow grip',
    },
    biasOrder: ['upper back', 'lats', 'neutral']
  }, 
  "machine row": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      neutral: '', 
      lats: 'narrow arm path', 
      "upper back": 'wide arm path', 
    },
    biasOrder: ['lats', 'neutral', 'upper back']
  }, 
  "machine pulldown": {
    "primary": "back",
    "secondary": ["biceps"],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    },
    "variants": {
      neutral: '', 
      lats: 'narrow grip', 
      "upper back": 'wide grip',
    },
    biasOrder: ['neutral', 'lats', 'upper back']
  }, 
  "kneeling cable row": {
    "primary": "back",
    "secondary": ["biceps"],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    },
    "variants": {
      lats: '',
    },
    biasOrder: ['lats', 'lats', 'lats']
  }, 
  "t-bar row": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      neutral: '', 
      lats: 'narrow grip', 
      "upper back": 'wide grip', 
    },
    biasOrder: ['upper back', 'neutral', 'lats']
  }, 
  "barbell row": {
    "primary": "back", 
    "secondary": ["biceps"], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": {
      neutral: '', 
      lats: 'narrow grip', 
      "upper back": 'wide grip',
    }, 
    biasOrder: ['neutral', 'lats', 'upper back']
  },  
  "lat pullover": {
    "primary": "back", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      lats: ''
    },
    biasOrder: ['lats', 'lats', 'lats']
  }, 
  "reverse pec-dec fly": {
    "primary": "back", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      "upper back": ''
    },
    biasOrder: ['upper back', 'upper back', 'upper back']
  }, 
  "face pulls": {
    "primary": "back",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": {
      "upper back": ''
    },
    biasOrder: ['upper back', 'upper back', 'upper back']
  }, 
  "barbell squat": {
    "primary": "legs", 
    "secondary": [], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": {
      quads: ''
    },
    biasOrder: ['quads', 'quads', 'quads']
  }, 
  "hack squat": {
    "primary": "legs", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": {
      quads: ''
    },
    biasOrder: ['quads', 'quads', 'quads']
  }, 
  "smith machine squat": {
    "primary": "legs", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": {
      quads: ''
    },
    biasOrder: ['quads', 'quads', 'quads']
  }, 
  "bulgarian split squat": {
    "primary": "legs", 
    "secondary": [], 
    "liftTypes": [3, 2], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": {
      quads: 'far stance', 
      neutral: '', 
      hamstrings: 'close stance'
    },
    biasOrder: ['hamstrings', 'neutral', 'quads']
  }, 
  "front squat": {
    "primary": "legs",
    "secondary": [],
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    },
    "variants": {
      quads: ''
    },
    biasOrder: ['quads', 'quads', 'quads']
  }, 
  "barbell romanian deadlift": {
    "primary": "legs", 
    "secondary": [], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": {
      hamstrings: ''
    },
    biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
  }, 
  "dumbell romanian deadlift": {
    "primary": "legs", 
    "secondary": [], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": {
      hamstrings: ''
    },
    biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
  }, 
  "deadlift": {
    "primary": "legs", 
    "secondary": ["back"], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": {
      hamstrings: ''
    }, 
    biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
  }, 
  "leg press": {
    "primary": "legs", 
    "secondary": [], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": {
      quads: 'low foot', 
      neutral: 'high foot', 
    },
    biasOrder: ['neutral', 'quads', 'quads']
  }, 
  "barbell hip thrust": {
    "primary": "legs",
    "secondary": [],
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    },
    "variants": {
      hamstrings: ''
    },
    biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
  }, 
  "leg extension": {
    "primary": "legs", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      quads: ''
    },
    biasOrder: ['quads', 'quads', 'quads']
  }, 
  "leg curl": {
    "primary": "legs", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      hamstrings: ''
    },
    biasOrder: ['hamstrings', 'hamstrings', 'hamstrings']
  }, 
  "adductor machine": {
    "primary": "legs",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": {
      neutral: ''
    }, 
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "abductor machine": {
    "primary": "legs",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    "variants": {
      neutral: ''
    }, 
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "military press": {
    "primary": "shoulders", 
    "secondary": ["triceps"], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "dumbell overhead press": {
    "primary": "shoulders", 
    "secondary": ["triceps"], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    "variants": {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "smith machine overhead press": {
    "primary": "shoulders", 
    "secondary": ["triceps"], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "machine overhead press": {
    "primary": "shoulders", 
    "secondary": ["triceps"], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "cable front raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      neutral: ''
    }, 
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "dumbell front raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    "variants": {
      neutral: ''
    }, 
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "cable lateral raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    "variants": {
      neutral: ''
    }, 
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "dumbell lateral raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "machine lateral raise": {
    "primary": "shoulders", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "dumbell curl": {
    "primary": "biceps", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "dumbell hammer curl": {
    "primary": "biceps",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "incline dumbell curl": {
    "primary": "biceps",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "cable curl": {
    "primary": "biceps", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "preacher curl": {
    "primary": "biceps", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "incline curl": {
    "primary": "biceps", 
    "secondary": [""], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "concentration curl": {
    "primary": "biceps", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "barbell curl": {
    "primary": "biceps", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "machine curl": {
    "primary": "biceps",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "skullcrusher": {
    "primary": "triceps", 
    "secondary": [], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "tricep pushdown": {
    "primary": "triceps", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "cable overhead extension": {
    "primary": "triceps", 
    "secondary": [], 
    "sequences": {
      "b": [7, 7, 8, 8],
      "i": [8, 8, 9, 9],
      "a": [9, 9, 9, 9]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  },
  "crossbody extension": {
    "primary": "triceps", 
    "secondary": [], 
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    }, 
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  },
  "machine tricep extension": {
    "primary": "triceps",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 11]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "machine lateral raise": {
    "primary": "side deltoids",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "machine shrugs": {
    "primary": "traps",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "smith machine shrugs": {
    "primary": "traps",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "barbell shrugs": {
    "primary": "traps",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "dumbell shrugs": {
    "primary": "traps",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "cable rear delt fly": {
    "primary": "rear deltoids",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "dumbell rear delt fly": {
    "primary": "rear deltoids",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "barbell forearm curl": {
    "primary": "forearms",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      nneutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "cable forearm curl": {
    "primary": "forearms",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "machine calf raise": {
    "primary": "calves",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "smith machine calf raise": {
    "primary": "calves",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "barbell calf raise": {
    "primary": "calves",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    biasOrder: ['neutral', 'neutral', 'neutral'],
    variants: {
      neutral: ''
    },
  }, 
  "dumbell calf raise": {
    "primary": "calves",
    "secondary": [],
    "sequences": {
      "b": [7, 8, 9, 9],
      "i": [8, 9, 9, 10],
      "a": [9, 9, 10, 10]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "cable crunch": {
    "primary": "abs",
    "secondary": [],
    "sequences": {
      "b": [8, 8, 8, 8],
      "i": [8, 8, 8, 8],
      "a": [8, 8, 8, 8]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "dumbell side bend": {
    "primary": "abs",
    "secondary": [],
    "sequences": {
      "b": [8, 8, 8, 8],
      "i": [8, 8, 8, 8],
      "a": [8, 8, 8, 8]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "weighted leg raise": {
    "primary": "abs",
    "secondary": [],
    "sequences": {
      "b": [8, 8, 8, 8],
      "i": [8, 8, 8, 8],
      "a": [8, 8, 8, 8]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
  "weighted situps": {
    "primary": "abs",
    "secondary": [],
    "sequences": {
      "b": [8, 8, 8, 8],
      "i": [8, 8, 8, 8],
      "a": [8, 8, 8, 8]
    },
    variants: {
      neutral: ''
    },
    biasOrder: ['neutral', 'neutral', 'neutral']
  }, 
}