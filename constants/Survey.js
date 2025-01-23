export const SURVEY_DATA = {
  experience: {
    id: 1,
    title: "What is your experience level?",
    options: [
      {
        id: 1,
        title: "0-2 years",
      },
      {
        id: 2,
        title: "0-4 years",
      },
      {
        id: 3,
        title: "4+ years",
      }
    ]
  }, 
  days: {
    id: 2,
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
    ]
  }, 
  bias: {
    id: 3,
    title: "Which muscle groups would you like to bias?", 
    options: [
      {
        id: 1,
        title: "Chest",
      },
      {
        id: 2,
        title: "Back",
      },
      {
        id: 3,
        title: "Legs",
      },
      {
        id: 4,
        title: "Shoulders",
      },
      {
        id: 5,
        title: "Biceps",
      },
      {
        id: 6,
        title: "Triceps",
      },
    ]
  }, 
  split: {
    id: 4,
    screens: [
      {
        title: "Which split type do you prefer?",
        options: null
      }, 
      {
        title: "Which routine do you prefer?",
        options: null
      }
    ]
  },
  style: {
    id: 5, 
    title: "What is your training goal?", 
    options: ["size", "strength"]
  }, 
  sets: {
    id: 7,
    title: "How many sets would you like for each movement?",
    options: [
      {
        id: 1,
        title: "2",
      },
      {
        id: 2,
        title: "3",
      },
      {
        id: 3,
        title: "4",
      }
    ]
  }, 
  time: {
    id: 8,
    title: "How long would you like to spend working out (minutes)?",
    options: [
      {
        id: 1,
        title: 30,
      },
      {
        id: 2,
        title: 45,
      },
      {
        id: 3,
        title: 60,
      }, 
      {
        id: 4,
        title: 75,
      },
      {
        id: 5,
        title: 90,
      },
      {
        id: 6,
        title: 105,
      },
      {
        id: 7,
        title: 120,
      }
    ]
  }, 
  accessories: {
    id: 9,
    title: "Which accessory groups would you like to work on?",
    options: [
      {
        id: 1,
        title: "Calves",
      },
      {
        id: 2,
        title: "Abs",
      },
      {
        id: 3,
        title: "Traps",
      },
      {
        id: 4,
        title: "Side Deltoids",
      },
      {
        id: 5,
        title: "Rear Deltoids",
      },
      {
        id: 6,
        title: "Forearms",
      },
    ]
  }, 
  regions: {
    id: 10,
    screens: [
      {
        title: "What region of the chest would you like to bias?",
        options: [
          "lower chest", "upper chest"
        ]
      }, 
      {
        title: "What region of the back would you like to bias?",
        options: [
          "lats", "upper back"
        ]
      }, 
      {
        title: "What region of the chest would you like to bias?",
        options: [
          "quads", "hamstrings"
        ]
      }, 
    ]
  }, 
  movements: {
    id: 11,
    title: "Which movement do you prefer?",
    screens: [
      {
        id: "horiz-press",
        options: [
          {id: 1, title: "Barbell Bench Press"},
          {id: 2, title: "Dumbell Bench Press"},
          {id: 3, title: "Smith Machine Bench Press"},
          {id: 4, title: "Machine Chest Press"},
        ]
      }, 
      {
        id: "vert-press",
        options: [
          {id: 1, title: "Military Press"},
          {id: 2, title: "Dumbell Overhead Press"},
          {id: 3, title: "Smith Machine Overhead Press"},
          {id: 4, title: "Machine Overhead Press"},
        ]
      }, 
      {
        id: "horiz-pull",
        options: [
          {id: 1, title: "T-Bar Row"},
          {id: 2, title: "Barbell Row"},
          {id: 3, title: "Seated Cable Row"},
          {id: 4, title: "Machine Row"},
        ]
      }, 
      {
        id: "vert-pull",
        options: [
          {id: 1, title: "Pull Ups"},
          {id: 2, title: "Lat Pulldown"},
          {id: 3, title: "Kneeling Cable Row"},
          {id: 4, title: "Machine Pulldown"},
        ]
      }, 
      {
        id: "knee-flex",
        options: [
          {id: 1, title: "Barbell Squat"},
          {id: 2, title: "Hack Squat"},
          {id: 3, title: "Front Squat"},
          {id: 4, title: "Leg Press"},
        ]
      }, 
      {
        id: "hip-ext",
        options: [
          {id: 1, title: "Barbell Deadlift"},
          {id: 2, title: "Barbell Romanian Deadlift"},
          {id: 3, title: "Dumbell Romanian Deadlift"},
          {id: 4, title: "Barbell Hip Thrust"},
        ]
      }, 
      {
        id: "curl",
        options: [
          {id: 1, title: "Dumbell Curl"},
          {id: 2, title: "Cable Curl"},
          {id: 3, title: "Dumbell Hammer Curl"},
          {id: 4, title: "Preacher Curl"},
        ]
      }, 
      {
        id: "ext",
        options: [
          {id: 1, title: "Tricep Pushdown"},
          {id: 2, title: "Cable Overhead Extension"},
          {id: 3, title: "Skullcrusher"},
          {id: 4, title: "Machine Tricep Extension"},
        ]
      }
    ]
  }
}

export const ROUTES = [
  "experience", "days", "bias", "base", "split", "style", "sets", "time", "accessories", "regions", "movements"
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
  u: "Upper Lower",
  b: "Body Part Split", 
  a: "Arnold Split",
  p: "Push Pull Legs", 
  b1: "Body Part Split 1",
  b2: "Body Part Split 2",
  b3: "Body Part Split 3", 
  p1: "Push Pull Legs 1", 
  p2: "Push Pull Legs 2", 
  p3: "Push Pull Legs 3", 
  a1: "Arnold Split 1", 
  a2: "Arnold Split 2", 
  a3: "Arnold Split 3",
  u1: "Upper Lower 1", 
  u2: "Upper Lower 2",
}