import React, { useState } from "react"
import styled, { ThemeProvider } from "styled-components"
import { AnimatePresence } from "framer-motion"
import Start from "../Start/Start"
import { WorkoutSession, Workout, Player } from "../../types"
import Workouts from "../Workouts/ActiveWorkouts"
import NewWorkout from "../Workouts/NewWorkout"
import api from "../../api"

const theme = {
  colors: {
    wine: "#6F263D",
    navy: "#041E42",
    gold: "#FFB81C",
    black: "#000000",
  },
  responsive: {
    phoneLandscape: 568,
    tablet: 768,
    largeTablet: 1024,
  },
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  @media (min-width: ${theme.responsive.tablet}px) {
    font-size: 18px;
  }
`

const App = (): JSX.Element => {
  const [newWorkout, setNewWorkout] = useState(false)
  const [activeWorkouts, setActiveWorkouts] = useState<WorkoutSession[]>([])
  const [workoutsLoading, setWorkoutsLoading] = useState(false)
  const [workoutsError, setWorkoutsError] = useState<string | null>(null)
  const [workouts, setWorkouts] = useState<Workout[]>([])

  const [playersLoading, setPlayersLoading] = useState(false)
  const [playersError, setPlayersError] = useState<string | null>(null)
  const [players, setPlayers] = useState<Player[]>([])

  const handleStart = (): void => {
    console.log("handleStart")
    setNewWorkout(true)
  }

  const handleGetPlayers = async (): Promise<void> => {
    setPlayersLoading(true)
    setPlayersError(null)

    try {
      setPlayers(await api.getPlayers())
    } catch (error) {
      console.error("Error loading players: ", error)
      setPlayersError(
        "Sorry, something went wrong getting the list of players."
      )
    } finally {
      setPlayersLoading(false)
    }
  }

  const handleGetWorkouts = async (): Promise<void> => {
    setWorkoutsLoading(true)
    setWorkoutsError(null)

    try {
      setWorkouts(await api.getWorkouts())
    } catch (error) {
      console.error("Error loading workouts: ", error)
      setWorkoutsError(
        "Sorry, something went wrong getting the list of workouts."
      )
    } finally {
      setWorkoutsLoading(false)
    }
  }

  const handleStartWorkout = (workoutSession: WorkoutSession): void => {
    console.log("Start workout session!", workoutSession)

    // Add new session to active workouts
    setActiveWorkouts([...activeWorkouts, workoutSession])
    setNewWorkout(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {activeWorkouts.length > 0 ? (
          <Workouts workouts={activeWorkouts} />
        ) : (
          <Start onStart={handleStart} />
        )}

        <AnimatePresence>
          {newWorkout && (
            <NewWorkout
              key="new-workout"
              getPlayers={handleGetPlayers}
              playersLoading={playersLoading}
              playersError={playersError}
              players={players}
              getWorkouts={handleGetWorkouts}
              workoutsLoading={workoutsLoading}
              workoutsError={workoutsError}
              workouts={workouts}
              onCancel={(): void => setNewWorkout(false)}
              onStart={handleStartWorkout}
            />
          )}
        </AnimatePresence>
      </Container>
    </ThemeProvider>
  )
}

export default App
