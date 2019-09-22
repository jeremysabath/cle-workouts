import React from "react"
import styled from "styled-components"
import { WorkoutSession, WorkoutFieldValue } from "../../types"
import CustomWorkout from "./CustomWorkout"
import WorkoutForm from "./WorkoutForm"

interface Props {
  sessions: WorkoutSession[]
  onChangeSet: (
    sessionId: string,
    setId: string,
    fieldId: string,
    nextValue: WorkoutFieldValue
  ) => void
  onAddSet: (sessionId: string) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }): string => theme.responsive.tablet}) {
    flex-direction: row;
  }
`

const WorkoutTabs = styled.section``

const ActiveSession = styled.section``

const ActiveSessions = ({
  sessions,
  onChangeSet,
  onAddSet,
}: Props): JSX.Element => {
  const selectedSession = sessions.find((session): boolean => session.selected)

  return (
    <Container>
      <WorkoutTabs>
        {sessions.map(
          (session): JSX.Element => (
            <div key={session.id}>
              <p>Player: {session.player.name}</p>
              <p>Workout: {session.workout.name}</p>
            </div>
          )
        )}
      </WorkoutTabs>
      {selectedSession && (
        <ActiveSession>
          <h1>{selectedSession.player.name}</h1>
          <h2>{selectedSession.workout.name}</h2>
          {selectedSession.workout.hasCustomForm ? (
            <CustomWorkout session={selectedSession} />
          ) : (
            <WorkoutForm
              session={selectedSession}
              onChangeSet={onChangeSet}
              onAddSet={onAddSet}
            />
          )}
        </ActiveSession>
      )}
    </Container>
  )
}

export default ActiveSessions
