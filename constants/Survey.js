export const SURVEY_DATA = [
  {
    key: "exp",
    type: "one",
    title: "What is your experience level?",
    options: [
      {
  
        title: "0-2 years",
        res: 'b'
      },
      {
        title: "2-4 years",
        res: 'i'
      },
      {
        title: "4+ years",
        res: 'a'
      }
    ],
    cols: 3, 
    required: true
  },
  {
    key: "schedule",
    type: "many",
    title: "Which days would you like to lift?",
    options: [
      {
  
        title: "M",
      },
      {
        title: "T",
      },
      {
        title: "W",
      },
      {
        title: "Th",
      },
      {
        title: "F",
      },
      {
        title: "S",
      },
      {
        title: "Su",
      }
    ],
    cols: 4, 
    minimum: 3, 
    headerLines: 1,
    btnGrow: true
  },
  {
    key: "bias",
    type: "many",
    title: "Which muscle groups would you like to bias?",
    options: [
      {
  
        title: "Chest",
        res: "chest"
      },
      {
        title: "Back",
        res: "back"
      },
      {
        title: "Legs",
        res: "legs"
      },
      {
        title: "Shoulders",
        res: "shoulders"
      },
      {
        title: "Biceps",
        res: "biceps"
      },
      {
        title: "Triceps",
        res: "triceps"
      },
    ],
    cols: 3, 
    minimum: 0
  },
  {
    key: "style",
    type: "range",
    title: "What is your training goal?",
    options: ["size", "strength"], 
    headerLines: 1
  },
  {
    key: "sets",
    type: "one",
    title: "How many sets would you like for each movement?",
    options: [
      {
  
        title: "2",
        res: 2
      },
      {
        title: "3",
        res: 3
      },
      {
        title: "4",
        res: 4
      }
    ],
    cols: 3, 
    required: true
  },
  {
    key: "time",
    type: "one",
    title: "How long would you like to spend working out (minutes)?",
    options: [
      {
        title: 30,
        res: 30
      },
      {
        title: 45,
        res: 45
      },
      {
        title: 60,
        res: 60
      },
      {
        title: 75,
        res: 75
      },
      {
        title: 90,
        res: 90
      },
      {
        title: 105,
        res: 105
      },
      {
        title: 120,
        res: 120
      }
    ],
    cols: 4, 
    required: true
  },
  {
    key: "accessories",
    type: "many",
    title: "Which accessory groups would you like to work on?",
    options: [
      {
        title: "Calves",
        res: "calves"
      },
      {
        title: "Abs",
        res: "abs"
      },
      {
        title: "Traps",
        res: "traps"
      },
      {
        title: "Side Deltoids",
        res: "side deltoids"
      },
      {
        title: "Rear Deltoids",
        res: "rear deltoids"
      },
      {
        title: "Forearms",
        res: "forearms"
      },
    ],
    cols: 3, 
    minimum: 0,
  },
  {
    key: "chest",
    type: "range",
    title: "What region of the chest would you like to bias?",
    options: ["lower chest", "upper chest"],
  }, 
  {
    key: "back",
    type: "range",
    title: "What region of the back would you like to bias?",
    options: ["lats", "upper back"],
  },
  {
    key: "legs",
    type: "range",
    title: "What region of the legs would you like to bias?",
    options: ["quads", "hamstrings"],
  },
  {
    key: "horizontal-press",
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {title: "Barbell Bench Press", res: "barbell bench press"},
      {title: "Dumbell Bench Press", res: "dumbell bench press"},
      {title: "Smith Machine Bench Press", res: "smith machine bench press"},
      {title: "Machine Chest Press", res: "machine chest press"},
    ], 
    cols: 2,
    headerLines: 1,
    required: true
  },
  {
    key: "vertical-press",
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {title: "Military Press", res: "military press"},
      {title: "Dumbell Overhead Press", res: "dumbell overhead press"},
      {title: "Smith Machine Overhead Press", res: "smith machine overhead press"},
      {title: "Machine Overhead Press", res: "machine overhead press"},
    ], 
    cols: 2,
    headerLines: 1,
    required: true
  },
  {
    key: "horizontal-pull",
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {title: "T-Bar Row", res: "t-bar row"},
      {title: "Barbell Row", res: "barbell row"},
      {title: "Seated Cable Row", res: "seated cable row"},
      {title: "Machine Row", res: "machine row"},
    ], 
    cols: 2,
    headerLines: 1,
    required: true
  },
  {
    key: "vertical-pull",
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {title: "Pull Ups", res: "pull ups"},
      {title: "Lat Pulldown", res: "lat pulldown"},
      {title: "Kneeling Cable Row", res: "kneeling cable row"},
      {title: "Machine Pulldown", res: "machine pulldown"},
    ], 
    cols: 2,
    headerLines: 1,
    required: true
  },
  {
    key: "knee-flexion",
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {title: "Barbell Squat", res: "barbell squat"},
      {title: "Hack Squat", res: "hack squat"},
      {title: "Front Squat", res: "front squat"},
      {title: "Leg Press", res: "leg press"},
    ], 
    cols: 2,
    headerLines: 1,
    required: true
  },
  {
    key: "hip-extension",
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {title: "Barbell Deadlift", res: "deadlift"},
      {title: "Barbell Romanian Deadlift", res: "barbell romanian deadlift"},
      {title: "Dumbell Romanian Deadlift", res: "dumbell romanian deadlift"},
      {title: "Barbell Hip Thrust", res: "barbell hip thrust"},
    ], 
    cols: 2,
    headerLines: 1,
    required: true
  },
  {
    key: "curl",
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {title: "Dumbell Curl", res: "dumbell curl"},
      {title: "Cable Curl", res: "cable curl"},
      {title: "Dumbell Hammer Curl", res: "dumbell hammer curl"},
      {title: "Preacher Curl", res: "preacher curl"},
    ], 
    cols: 2,
    headerLines: 1,
    required: true
  },
  {
    key: "extension",
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {title: "Tricep Pushdown", res: "tricep pushdown"},
      {title: "Cable Overhead Extension", res: "cable overhead extension"},
      {title: "Skullcrusher", res: "skullcrusher"},
      {title: "Machine Tricep Extension", res: "machine tricep extension"},
    ], 
    cols: 2,
    headerLines: 1,
    required: true
  },
  {
    key: 'split',
    type: 'submit',
  }
]

export const SPLIT_SAMPLES = {
  "": "",
  u: "chest back biceps triceps shoulders, legs",
  b: "chest, back, legs, shoulders, biceps triceps", 
  a: "chest back, triceps shoulders biceps, legs",
  p: "chest triceps shoulders, back biceps, legs", 
  b1: "chest triceps, back, legs, shoulders biceps",
  b2: "chest, back biceps, shoulders triceps, legs",
  b3: "chest, back, legs, shoulders biceps triceps", 
  p1: "chest shoulders triceps, back biceps, legs", 
  p2: "chest triceps, back biceps, legs shoulders", 
  p3: "chest triceps, legs, shoulders, back biceps", 
  a1: "chest back, shoulders biceps triceps, legs", 
  a2: "chest back, legs shoulders, biceps triceps", 
  a3: "chest back, biceps triceps, shoulders, legs",
  u1: "chest back shoulders biceps triceps, legs", 
  u2: "chest back biceps triceps, legs shoulders",
}

export const SPLIT_TITLES = {
  "": "",
  u: "Upper / Lower",
  b: "Body Part Split", 
  a: "Arnold Split",
  p: "Push Pull Legs", 
  b1: "Back Focused Body Part Split",
  b2: "Chest Focused Body Part Split",
  b3: "Arm Focused Body Part Split", 
  p1: "Classic Push Pull Legs", 
  p2: "Upper Focused Push Pull Legs", 
  p3: "Shoulder Focused Push Pull Legs", 
  a1: "Classic Arnold Split", 
  a2: "Upper Focused Arnold Split", 
  a3: "Shoulder Focused Arnold Split",
  u1: "Classic Upper / Lower", 
  u2: "Upper / Legs and Shoulders",
}