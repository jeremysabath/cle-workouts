import hoop from "../assets/icons/hoop.svg"
import { WorkoutCategory, Workout, WorkoutFieldType } from "../types"

const categories: { [name: string]: WorkoutCategory } = {
  shooting: {
    id: "shooting",
    name: "Shooting",
    iconSrc: hoop,
  },
}

const workouts: Workout[] = [
  {
    id: "spot-shooting",
    name: "Spot-up Shooting",
    category: categories.shooting,
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
    ],
  },
]

export default workouts
