import React from "react"
import { WorkoutSession, WorkoutFieldValue } from "../../types"

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

const WorkoutForm = ({
  session,
  onChangeSet,
  onAddSet,
}: Props): JSX.Element => {
  return (
    <div>
      <h1>Sets</h1>
      <p>The data...</p>
    </div>
  )
}

export default WorkoutForm
