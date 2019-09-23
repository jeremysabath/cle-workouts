import React from "react"
import { WorkoutSession, WorkoutFieldValue } from "../../types"
import SpotUpShooting from "./Custom/SpotUpShooting"

interface Props {
  session: WorkoutSession
  onChangeSet: (
    sessionId: string,
    setId: string,
    fieldId: string,
    nextValue: WorkoutFieldValue
  ) => void
  onAddSet: (sessionId: string) => void
}

const CustomWorkout = (props: Props): JSX.Element | null => {
  switch (props.session.workout.id) {
    case "spot-shooting":
      return <SpotUpShooting {...props} />
    default:
      console.warn("Unknown custom workout: ", props.session.workout)
      return null
  }
}

export default CustomWorkout
