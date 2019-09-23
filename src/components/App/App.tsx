import React, { useState } from "react"
import styled, { ThemeProvider } from "styled-components"
import { AnimatePresence } from "framer-motion"
import Start from "../Start/Start"
import { WorkoutSession, Workout, Player, WorkoutFieldValue } from "../../types"
import ActiveSessions from "../Workouts/ActiveSessions"
import NewSession from "../Workouts/NewSession"
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

console.log("test")

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
  const [newSession, setNewSession] = useState(false)
  const [activeSessions, setActiveSessions] = useState<WorkoutSession[]>([])

  const [workoutsLoading, setWorkoutsLoading] = useState(false)
  const [workoutsError, setWorkoutsError] = useState<string | null>(null)
  const [workouts, setWorkouts] = useState<Workout[]>([])

  const [playersLoading, setPlayersLoading] = useState(false)
  const [playersError, setPlayersError] = useState<string | null>(null)
  const [players, setPlayers] = useState<Player[]>([])

  const handleAddSession = (): void => {
    console.log("handleAddSession")
    setNewSession(true)
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

    // Add new session to active list and set it selected.
    setActiveSessions([
      ...activeSessions.map(
        (session): WorkoutSession => ({
          ...session,
          selected: false,
        })
      ),
      { ...workoutSession, selected: true },
    ])
    setNewSession(false)
  }

  const handleChangeSet = (
    sessionId: string,
    setId: string,
    fieldId: string,
    nextValue: WorkoutFieldValue
  ): void => {
    console.log("handleChangeSet", sessionId, setId, fieldId, nextValue)
  }

  const handleAddSet = (sessionId: string): void => {
    console.log("handleAddSet", sessionId)
  }

  const handleChangeSelectedSession = (id: string): void => {
    const selected = activeSessions.find(
      (session): boolean => session.id === id
    )

    if (!selected) {
      console.error(
        "Couldn't find selected session in active list",
        id,
        activeSessions
      )
      return
    }

    console.log("set session selected", selected)

    setActiveSessions([
      ...activeSessions.map(
        (session): WorkoutSession => ({
          ...session,
          selected: session.id === id,
        })
      ),
    ])
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {activeSessions.length > 0 ? (
          <ActiveSessions
            sessions={activeSessions}
            onChangeSet={handleChangeSet}
            onAddSet={handleAddSet}
            onChangeSelectedSession={handleChangeSelectedSession}
            onAddSession={handleAddSession}
          />
        ) : (
          <Start onStart={handleAddSession} />
        )}

        <AnimatePresence>
          {newSession && (
            <NewSession
              key="new-session"
              getPlayers={handleGetPlayers}
              playersLoading={playersLoading}
              playersError={playersError}
              players={players}
              getWorkouts={handleGetWorkouts}
              workoutsLoading={workoutsLoading}
              workoutsError={workoutsError}
              workouts={workouts}
              onCancel={(): void => setNewSession(false)}
              onStart={handleStartWorkout}
            />
          )}
        </AnimatePresence>
      </Container>
    </ThemeProvider>
  )
}

export default App
