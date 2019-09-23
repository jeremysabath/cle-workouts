import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "semantic-ui-react"
import { motion } from "framer-motion"
import { Player, Workout, WorkoutSession, NewWorkoutSession } from "../../types"
import Players from "../Players/Players"
import PlayerCard from "../Players/PlayerCard"
import Workouts from "./Workouts"
import { randomId } from "../../helpers"

interface Props {
  session: NewWorkoutSession
  selectPlayer: (player: Player | null) => void
  selectWorkout: (workout: Workout | null) => void

  getPlayers: () => void
  playersLoading: boolean
  playersError: string | null
  players: Player[]

  getWorkouts: () => void
  workoutsLoading: boolean
  workoutsError: string | null
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
  z-index: 2;
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

const SectionContainer = styled.div<{ selected: boolean }>`
  /* display: ${({ selected }): string => (selected ? "flex" : "block")}; */
  display: block;
  margin-bottom: 2em;

  &:last-child {
    margin-bottom: 1em;
  }

  & h2 {
    margin-right: 1em;
  }
`

const SelectedPlayer = styled.div`
  display: flex;

  & > *:first-child {
    flex: 1;
    margin-right: 1em;
  }
`

const WorkoutsWrapper = styled.div<{ selected: boolean }>`
  display: ${({ selected }): string => (selected ? "flex" : "block")};

  & > *:first-child {
    flex: ${({ selected }): string => (selected ? "1" : "unset")};
    margin-right: ${({ selected }): string => (selected ? "1em" : "unset")};
  }
`

const DeleteButton = styled(Button)`
  height: 35px;
  width: 35px;
`

const StartButton = styled(Button)`
  width: 100%;
  background-color: ${({ theme }): string => theme.colors.wine};
  color: white;
  margin-bottom: 1em;

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    width: unset;
  }
`

const NewSession = ({
  session,
  selectPlayer,
  selectWorkout,
  getPlayers,
  playersLoading,
  playersError,
  players,
  getWorkouts,
  workoutsError,
  workoutsLoading,
  workouts,
  onCancel,
  onStart,
}: Props): JSX.Element => {
  const { player, workout, date } = session

  const handleStart = (): void => {
    if (!player || !workout) {
      console.error(
        "Can't start workout, either player or workout isn't selected",
        player,
        workout
      )
      return
    }

    onStart({
      id: randomId(),
      player,
      workout,
      date,
      sets: [],
      selected: true,
    })
  }

  // Fetch players and workouts on mount.
  useEffect((): void => {
    getPlayers()
    getWorkouts()
  }, [])

  return (
    <Container animate={{ y: 0 }} initial={{ y: "100%" }} exit={{ y: "100%" }}>
      <Header>
        <a onClick={onCancel}>Cancel</a>
        <h1>New Workout</h1>
      </Header>
      <div>
        <SectionContainer selected={!!player}>
          <h2>Select player: </h2>
          {player ? (
            <SelectedPlayer>
              <PlayerCard
                player={player}
                onSelect={(): void => selectPlayer(null)}
                small
              />
              <DeleteButton
                circular
                icon="delete"
                onClick={(): void => selectPlayer(null)}
              />
            </SelectedPlayer>
          ) : (
            <Players
              loading={playersLoading}
              error={playersError}
              players={players}
              onSelect={selectPlayer}
            />
          )}
        </SectionContainer>
        {player && (
          <SectionContainer selected={!!workout}>
            <h2>Select workout: </h2>
            <WorkoutsWrapper selected={!!workout}>
              <Workouts
                loading={workoutsLoading}
                error={workoutsError}
                workouts={workout ? [workout] : workouts}
                onSelect={
                  workout ? (): void => selectWorkout(null) : selectWorkout
                }
                hideCategories={!!workout}
              />
              {workout && (
                <DeleteButton
                  circular
                  icon="delete"
                  onClick={(): void => selectWorkout(null)}
                />
              )}
            </WorkoutsWrapper>
            {!workout && (
              <div style={{ marginTop: "1em", textAlign: "center" }}>
                <a onClick={(): void => alert("Coming soon...")}>
                  Add a new workout
                </a>
              </div>
            )}
          </SectionContainer>
        )}
      </div>

      {player && workout && (
        <StartButton size="huge" content="Start" onClick={handleStart} />
      )}
    </Container>
  )
}

export default NewSession
