export const SURVEY_DATA = [
  {
    key: "experience",
    id: 1,
    type: "one",
    title: "What is your experience level?",
    options: [
      {
        id: 1,
        title: "0-2 years",
        res: 'b'
      },
      {
        id: 2,
        title: "0-4 years",
        res: 'i'
      },
      {
        id: 3,
        title: "4+ years",
        res: 'a'
      }
    ],
    cols: 3
  },
  {
    key: "schedule",
    id: 2,
    type: "many",
    title: "Which days would you like to lift?",
    options: [
      {
        id: 1,
        title: "M",
      },
      {
        id: 2,
        title: "T",
      },
      {
        id: 3,
        title: "W",
      },
      {
        id: 4,
        title: "Th",
      },
      {
        id: 5,
        title: "F",
      },
      {
        id: 6,
        title: "S",
      },
      {
        id: 7,
        title: "Su",
      }
    ],
    cols: 4
  },
  {
    key: "bias",
    id: 3,
    type: "many",
    title: "Which muscle groups would you like to bias?",
    options: [
      {
        id: 1,
        title: "Chest",
        res: "chest"
      },
      {
        id: 2,
        title: "Back",
        res: "back"
      },
      {
        id: 3,
        title: "Legs",
        res: "legs"
      },
      {
        id: 4,
        title: "Shoulders",
        res: "shoulders"
      },
      {
        id: 5,
        title: "Biceps",
        res: "biceps"
      },
      {
        id: 6,
        title: "Triceps",
        res: "triceps"
      },
    ],
    cols: 3
  },
  {
    key: "style",
    id: 4,
    type: "range",
    title: "What is your training goal?",
    options: ["size", "strength"]
  },
  {
    key: "sets",
    id: 5,
    type: "one",
    title: "How many sets would you like for each movement?",
    options: [
      {
        id: 1,
        title: "2",
        res: 2
      },
      {
        id: 2,
        title: "3",
        res: 3
      },
      {
        id: 3,
        title: "4",
        res: 4
      }
    ],
    cols: 3
  },
  {
    key: "time",
    id: 6,
    type: "one",
    title: "How long would you like to spend working out (minutes)?",
    options: [
      {
        id: 1,
        title: 30,
        res: 30
      },
      {
        id: 2,
        title: 45,
        res: 45
      },
      {
        id: 3,
        title: 60,
        res: 60
      },
      {
        id: 4,
        title: 75,
        res: 75
      },
      {
        id: 5,
        title: 90,
        res: 90
      },
      {
        id: 6,
        title: 105,
        res: 105
      },
      {
        id: 7,
        title: 120,
        res: 120
      }
    ],
    cols: 4
  },
  {
    key: "accessories",
    id: 7,
    type: "many",
    title: "Which accessory groups would you like to work on?",
    options: [
      {
        id: 1,
        title: "Calves",
        res: "calves"
      },
      {
        id: 2,
        title: "Abs",
        res: "abs"
      },
      {
        id: 3,
        title: "Traps",
        res: "traps"
      },
      {
        id: 4,
        title: "Side Deltoids",
        res: "side deltoids"
      },
      {
        id: 5,
        title: "Rear Deltoids",
        res: "rear deltoids"
      },
      {
        id: 6,
        title: "Forearms",
        res: "forearms"
      },
    ],
    cols: 3
  },
  {
    key: "chest",
    id: 8,
    type: "range",
    title: "What region of the chest would you like to bias?",
    options: ["lower chest", "upper chest"],
  }, 
  {
    key: "back",
    id: 9,
    type: "range",
    title: "What region of the back would you like to bias?",
    options: ["lats", "upper back"],
  },
  {
    key: "legs",
    id: 10,
    type: "range",
    title: "What region of the legs would you like to bias?",
    options: ["quads", "hamstrings"],
  },
  {
    key: "horizontal-press",
    id: 11,
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {id: 1, title: "Barbell Bench Press", res: "barbell bench press"},
      {id: 2, title: "Dumbell Bench Press", res: "dumbell bench press"},
      {id: 3, title: "Smith Machine Bench Press", res: "smith machine bench press"},
      {id: 4, title: "Machine Chest Press", res: "machine chest press"},
    ], 
    cols: 2,
  },
  {
    key: "vertical-press",
    id: 12,
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {id: 1, title: "Military Press", res: "military press"},
      {id: 2, title: "Dumbell Overhead Press", res: "dumbell overhead press"},
      {id: 3, title: "Smith Machine Overhead Press", res: "smith machine overhead press"},
      {id: 4, title: "Machine Overhead Press", res: "machine overhead press"},
    ], 
    cols: 2,
  },
  {
    key: "horizontal-pull",
    id: 13,
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {id: 1, title: "T-Bar Row", res: "t-bar row"},
      {id: 2, title: "Barbell Row", res: "barbell row"},
      {id: 3, title: "Seated Cable Row", res: "seated cable row"},
      {id: 4, title: "Machine Row", res: "machine row"},
    ], 
    cols: 2,
  },
  {
    key: "vertical-pull",
    id: 14,
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {id: 1, title: "Pull Ups", res: "pull ups"},
      {id: 2, title: "Lat Pulldown", res: "lat pulldown"},
      {id: 3, title: "Kneeling Cable Row", res: "kneeling cable row"},
      {id: 4, title: "Machine Pulldown", res: "machine pulldown"},
    ], 
    cols: 2,
  },
  {
    key: "knee-flexion",
    id: 15,
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {id: 1, title: "Barbell Squat", res: "barbell squat"},
      {id: 2, title: "Hack Squat", res: "hack squat"},
      {id: 3, title: "Front Squat", res: "front squat"},
      {id: 4, title: "Leg Press", res: "leg press"},
    ], 
    cols: 2,
  },
  {
    key: "hip-extension",
    id: 16,
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {id: 1, title: "Barbell Deadlift", res: "barbell deadlift"},
      {id: 2, title: "Barbell Romanian Deadlift", res: "barbell romanian deadlift"},
      {id: 3, title: "Dumbell Romanian Deadlift", res: "dumbell romanian deadlift"},
      {id: 4, title: "Barbell Hip Thrust", res: "barbell hip thrust"},
    ], 
    cols: 2,
  },
  {
    key: "curl",
    id: 17,
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {id: 1, title: "Dumbell Curl", res: "dumbell curl"},
      {id: 2, title: "Cable Curl", res: "cable curl"},
      {id: 3, title: "Dumbell Hammer Curl", res: "dumbell hammer curl"},
      {id: 4, title: "Preacher Curl", res: "preacher curl"},
    ], 
    cols: 2,
  },
  {
    key: "extension",
    id: 18,
    type: "one",
    title: "Which movement do you prefer?",
    options: [
      {id: 1, title: "Tricep Pushdown", res: "tricep pushdown"},
      {id: 2, title: "Cable Overhead Extension", res: "cable overhead extension"},
      {id: 3, title: "Skullcrusher", res: "skullcrusher"},
      {id: 4, title: "Machine Tricep Extension", res: "machine tricep extension"},
    ], 
    cols: 2,
  },
  {
    key: 'split',
    id: 19,
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