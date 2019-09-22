import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "semantic-ui-react"
import { Player, Workout, WorkoutSession } from "../../types"
import Players from "../Players/Players"

interface Props {
  getPlayers: () => void
  playersLoading: boolean
  playersError: string | null
  players: Player[]

  getWorkouts: () => void
  workoutsLoading: boolean
  workouts: Workout[]

  onStart: (workoutSession: WorkoutSession) => void
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  color: black;
`

const NewWorkout = ({
  getPlayers,
  playersLoading,
  playersError,
  players,
  getWorkouts,
  workoutsLoading,
  workouts,
  onStart,
}: Props): JSX.Element => {
  const [player, setPlayer] = useState<Player | null>(null)
  const [workout, setWorkout] = useState<Workout | null>(null)

  console.log("render NewWorkout")

  return (
    <Container>
      <h1>New Workout</h1>
      <h2>Player: </h2>
      {player ? (
        <div>
          <p>{player.name}</p>
          <Button icon="delete" onClick={(): void => setPlayer(null)} />
        </div>
      ) : (
        <Players
          loading={playersLoading}
          error={playersError}
          players={players}
        />
      )}
    </Container>
  )
}

export default NewWorkout
