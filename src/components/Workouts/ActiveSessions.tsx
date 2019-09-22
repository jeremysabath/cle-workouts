import React from "react"
import styled from "styled-components"
import { Button } from "semantic-ui-react"
import { WorkoutSession, WorkoutFieldValue } from "../../types"
import CustomWorkout from "./CustomWorkout"
import WorkoutForm from "./WorkoutForm"
import SessionTab from "./SessionTab"

interface Props {
  sessions: WorkoutSession[]
  onChangeSet: (
    sessionId: string,
    setId: string,
    fieldId: string,
    nextValue: WorkoutFieldValue
  ) => void
  onAddSet: (sessionId: string) => void
  onChangeSelectedSession: (sessionId: string) => void
  onAddSession: () => void
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column-reverse;

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    flex-direction: row;
  }
`

const WorkoutTabs = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    flex-direction: column;
  }
`

const AddSessionButton = styled(Button)`
  margin-top: 1em;
`

const ActiveSession = styled.section``

const ActiveSessions = ({
  sessions,
  onChangeSet,
  onAddSet,
  onChangeSelectedSession,
  onAddSession,
}: Props): JSX.Element => {
  const selectedSession = sessions.find((session): boolean => session.selected)

  return (
    <Container>
      <WorkoutTabs>
        {sessions.map(
          (session): JSX.Element => (
            <SessionTab
              session={session}
              onClick={(): void => onChangeSelectedSession(session.id)}
            />
          )
        )}
        <AddSessionButton
          size="huge"
          circular
          icon="add"
          onClick={onAddSession}
        />
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
