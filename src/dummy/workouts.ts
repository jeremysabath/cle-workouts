import hoop from "../assets/icons/hoop.svg"
import barbell from "../assets/icons/barbell.svg"
import running from "../assets/icons/running.svg"
import { WorkoutCategory, Workout, WorkoutFieldType } from "../types"

const categories: { [name: string]: WorkoutCategory } = {
  shooting: {
    id: "shooting",
    name: "Shooting",
    iconSrc: hoop,
  },
  strength: {
    id: "strength",
    name: "Strength",
    iconSrc: barbell,
  },
  conditioning: {
    id: "conditioning",
    name: "Conditioning",
    iconSrc: running,
  },
}

const workouts: Workout[] = [
  {
    id: "spot-shooting",
    name: "Spot-up Shooting",
    category: categories.shooting,
    hasCustomForm: true,
    fields: [
      {
        id: "location",
        name: "Court location",
        type: WorkoutFieldType.Options,
        options: [
          {
            id: "top-of-the-key-3",
            name: "Top of the key (3pt)",
          },
          {
            id: "top-of-the-key-2",
            name: "Top of the key (2pt)",
          },
          {
            id: "above-break-l",
            name: "Above the break (left)",
          },
          {
            id: "above-break-r",
            name: "Above the break (right)",
          },
          {
            id: "corner-l",
            name: "Corner (left)",
          },
          {
            id: "corner-r",
            name: "Corner (right)",
          },
          {
            id: "short-corner-l",
            name: "Short corner (left)",
          },
          {
            id: "short-corner-r",
            name: "Short corner (right)",
          },
          {
            id: "post-l",
            name: "Post (left)",
          },
          {
            id: "post-r",
            name: "Post (right)",
          },
          {
            id: "free-throw",
            name: "Free throw",
          },
          {
            id: "elbow-l",
            name: "Elbow (left)",
          },
          {
            id: "elbow-r",
            name: "Elbow (right)",
          },
          {
            id: "paint",
            name: "Paint",
          },
          {
            id: "restricted",
            name: "Restricted area",
          },
        ],
      },
      {
        id: "makes",
        name: "Makes",
        type: WorkoutFieldType.Number,
      },
      {
        id: "attempts",
        name: "Attempts",
        type: WorkoutFieldType.Number,
      },
    ],
  },
  {
    id: "bench-press",
    name: "Bench press",
    category: categories.strength,
    fields: [
      {
        id: "weight",
        name: "Weight",
        type: WorkoutFieldType.Number,
        unit: "lbs",
      },
      {
        id: "reps",
        name: "Reps",
        type: WorkoutFieldType.Number,
      },
      {
        id: "rest",
        name: "Rest",
        type: WorkoutFieldType.Time,
        unit: "seconds",
      },
    ],
  },
  {
    id: "treadmill",
    name: "Treadmill",
    category: categories.conditioning,
    fields: [
      {
        id: "speed",
        name: "Speed",
        type: WorkoutFieldType.Number,
        unit: "mph",
      },
      {
        id: "incline",
        name: "Incline",
        type: WorkoutFieldType.Number,
        unit: "%",
      },
      {
        id: "duration",
        name: "Duration",
        type: WorkoutFieldType.Time,
        unit: "minutes",
      },
      {
        id: "rest",
        name: "Rest",
        type: WorkoutFieldType.Time,
        unit: "seconds",
      },
    ],
  },
  {
    id: "stair-sprints",
    name: "Stair sprints",
    category: categories.conditioning,
    fields: [
      {
        id: "duration",
        name: "Duration",
        type: WorkoutFieldType.Time,
        unit: "seconds",
      },
      {
        id: "rest",
        name: "Rest",
        type: WorkoutFieldType.Time,
        unit: "seconds",
      },
    ],
  },
  {
    id: "dynamic-stretch",
    name: "Dynamic stretches",
    category: categories.conditioning,
    fields: [
      {
        id: "stretch",
        name: "Stretch",
        type: WorkoutFieldType.Options,
        options: [
          {
            id: "ball-quad-stretch",
            name: "Ball quad stretch",
          },
          {
            id: "hamstring-rocker",
            name: "Hamstring rocker",
          },
          {
            id: "split-stance-side",
            name: "Split-stance side lean",
          },
          {
            id: "split-stance-spine",
            name: "Split-stance spine rotation",
          },
          {
            id: "wall-lat-stretch",
            name: "Wall lat stretch",
          },
        ],
      },
      {
        id: "duration",
        name: "Duration",
        type: WorkoutFieldType.Time,
        unit: "seconds",
      },
      {
        id: "rest",
        name: "Rest",
        type: WorkoutFieldType.Time,
        unit: "seconds",
      },
    ],
  },
]

export default workouts
