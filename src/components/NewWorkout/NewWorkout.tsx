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

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: "back title other";
  margin-bottom: 2em;

  & *:nth-child(1) {
    grid-area: back;
    width: fit-content;
  }

  & *:nth-child(2) {
    grid-area: title;
    text-align: center;
    margin: 0;
  }
`

const PlayerContainer = styled.div<{ selected: boolean }>`
  display: ${({ selected }): string => (selected ? "flex" : "block")};

  & h2 {
    margin-right: 1em;
  }
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
      <Header>
        <Button onClick={onCancel}>Cancel</Button>
        <h1>New Workout</h1>
      </Header>
      <PlayerContainer selected={!!player}>
        <h2>{player ? "" : "Select "}Player: </h2>
        {player ? (
          <SelectedPlayer>
            <PlayerCard
              player={player}
              onSelect={(): void => setPlayer(null)}
              small
            />
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
      </PlayerContainer>
    </Container>
  )
}

export default NewWorkout
