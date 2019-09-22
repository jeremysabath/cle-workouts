import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "semantic-ui-react"
import { motion } from "framer-motion"
import { Player, Workout, WorkoutSession } from "../../types"
import Players from "../Players/Players"
import PlayerCard from "../Players/PlayerCard"

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
  padding: 1em;
`

const SelectedPlayer = styled.div`
  display: flex;

  & *:first-child {
    margin-right: 1em;
  }

  & button {
    height: 40px;
  }
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
        <SelectedPlayer>
          <PlayerCard player={player} onSelect={(): void => setPlayer(null)} />
          <Button icon="delete" onClick={(): void => setPlayer(null)} />
        </SelectedPlayer>
      ) : (
        <Players
          loading={playersLoading}
          error={playersError}
          players={players}
          onSelect={setPlayer}
        />
      )}
    </Container>
  )
}

export default NewWorkout
