import React, { useState } from "react"
import styled, { ThemeProvider } from "styled-components"
import { AnimatePresence } from "framer-motion"
import Start from "../Start/Start"
import {
  WorkoutSession,
  Workout,
  Player,
  WorkoutFieldValue,
  WorkoutSet,
  WorkoutData,
  WorkoutFieldType,
  OptionsWorkoutData,
} from "../../types"
import ActiveSessions from "../Workouts/ActiveSessions"
import NewSession from "../Workouts/NewSession"
import api from "../../api"
import { randomId } from "../../helpers"
import courtEmpty from "../../assets/court-empty.png"
import courtTopSelected from "../../assets/court-top-selected.png"

// preload court images
const courtEmptyImg = new Image()
courtEmptyImg.src = courtEmpty
const courtTopSelectedImg = new Image()
courtTopSelectedImg.src = courtTopSelected

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
  const [newSession, setNewSession] = useState(false)
  const [activeSessions, setActiveSessions] = useState<WorkoutSession[]>([])

  const [workoutsLoading, setWorkoutsLoading] = useState(false)
  const [workoutsError, setWorkoutsError] = useState<string | null>(null)
  const [workouts, setWorkouts] = useState<Workout[]>([])

  const [playersLoading, setPlayersLoading] = useState(false)
  const [playersError, setPlayersError] = useState<string | null>(null)
  const [players, setPlayers] = useState<Player[]>([])

  const handleAddSession = (): void => {
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

  const handleChangeSessionDate = (
    sessionId: string,
    date: Date | null
  ): void => {
    if (!date) return

    const indexToUpdate = activeSessions.findIndex(
      (session): boolean => session.id === sessionId
    )

    if (indexToUpdate < 0) {
      console.error(
        "Couldn't find session, can't edit date.",
        sessionId,
        activeSessions
      )
      return
    }

    const sessionWithNewDate = { ...activeSessions[indexToUpdate], date }
    const updatedSessions = [...activeSessions]
    updatedSessions.splice(indexToUpdate, 1, sessionWithNewDate)
    setActiveSessions(updatedSessions)
  }

  const handleChangeSessionNotes = (sessionId: string, notes: string): void => {
    const indexToUpdate = activeSessions.findIndex(
      (session): boolean => session.id === sessionId
    )

    if (indexToUpdate < 0) {
      console.error(
        "Couldn't find session, can't edit notes.",
        sessionId,
        activeSessions
      )
      return
    }

    const sessionWithNewNotes = { ...activeSessions[indexToUpdate], notes }
    const updatedSessions = [...activeSessions]
    updatedSessions.splice(indexToUpdate, 1, sessionWithNewNotes)
    setActiveSessions(updatedSessions)
  }

  const handleChangeSet = (
    sessionId: string,
    setId: string,
    fieldId: string,
    nextValue: WorkoutFieldValue
  ): void => {
    const sessionIndexToUpdate = activeSessions.findIndex(
      (session): boolean => session.id === sessionId
    )

    if (sessionIndexToUpdate < 0) {
      console.error(
        "Couldn't find session, can't edit set.",
        sessionId,
        activeSessions
      )
      return
    }

    const session = activeSessions[sessionIndexToUpdate]
    const setIndexToUpdate = session.sets.findIndex(
      (set): boolean => set.id === setId
    )

    if (setIndexToUpdate < 0) {
      console.error(
        "Couldn't find set, can't edit.",
        session,
        setId,
        activeSessions
      )
      return
    }

    const set = { ...session.sets[setIndexToUpdate] }
    set.data[fieldId].value = nextValue

    const updatedSets = [...session.sets]
    updatedSets.splice(setIndexToUpdate, 1, set)

    const updatedSession = { ...session, sets: updatedSets }
    const updatedSessions = [...activeSessions]
    updatedSessions.splice(sessionIndexToUpdate, 1, updatedSession)
    setActiveSessions(updatedSessions)
  }

  const handleAddSet = (sessionId: string): void => {
    const indexToUpdate = activeSessions.findIndex(
      (session): boolean => session.id === sessionId
    )

    if (indexToUpdate < 0) {
      console.error(
        "Couldn't find session, can't add set.",
        sessionId,
        activeSessions
      )
      return
    }

    const sessionToUpdate = activeSessions[indexToUpdate]
    const newSetData: { [id: string]: WorkoutData } = {}
    sessionToUpdate.workout.fields.forEach(
      (field): void => {
        newSetData[field.id] = { ...field }
      }
    )

    const nextSets = [
      ...sessionToUpdate.sets,
      { id: randomId(), data: newSetData },
    ]
    const sessionWithNewSet = { ...sessionToUpdate, sets: nextSets }
    const updatedSessions = [...activeSessions]
    updatedSessions.splice(indexToUpdate, 1, sessionWithNewSet)
    setActiveSessions(updatedSessions)
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
            onChangeSessionDate={handleChangeSessionDate}
            onChangeSessionNotes={handleChangeSessionNotes}
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
