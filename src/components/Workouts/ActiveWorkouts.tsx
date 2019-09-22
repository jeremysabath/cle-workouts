import React from "react"
import { WorkoutSession } from "../../types"

interface Props {
  workouts: WorkoutSession[]
}

const ActiveWorkouts = ({ workouts }: Props): JSX.Element => (
  <div>
    <h1>Workouts</h1>
    {workouts.length > 0 && (
      <ul>
        {workouts.map(
          (workout): JSX.Element => (
            <li key={workout.id}>
              <p>Player: {workout.player.name}</p>
              <p>Workout: {workout.workout.name}</p>
            </li>
          )
        )}
      </ul>
    )}
  </div>
)

export default ActiveWorkouts
