import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "semantic-ui-react"
import { motion } from "framer-motion"
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

  onCancel: () => void
  onStart: (workoutSession: WorkoutSession) => void
}

const Container = styled(motion.div)`
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
  onCancel,
  onStart,
}: Props): JSX.Element => {
  const [player, setPlayer] = useState<Player | null>(null)
  const [workout, setWorkout] = useState<Workout | null>(null)

  console.log("render NewWorkout")

  // Fetch players and workouts on mount.
  useEffect((): void => {
    getPlayers()
    getWorkouts()
  }, [])

  return (
    <Container animate={{ y: 0 }} initial={{ y: "100%" }} exit={{ y: "100%" }}>
      <Button onClick={onCancel}>Cancel</Button>
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
