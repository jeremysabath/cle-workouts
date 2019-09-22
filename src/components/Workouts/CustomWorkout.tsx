import React from "react"
import { WorkoutSession } from "../../types"
import SpotUpShooting from "./Custom/SpotUpShooting"

interface Props {
  session: WorkoutSession
}

const CustomWorkout = ({ session }: Props): JSX.Element | null => {
  switch (session.workout.id) {
    case "spot-shooting":
      return <SpotUpShooting />
    default:
      console.warn("Unknown custom workout: ", session.workout)
      return null
  }
}

export default CustomWorkout
