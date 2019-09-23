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

const TabContainer = styled.section`
  display: flex;
  align-items: center;

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    flex-direction: column;
  }
`

const WorkoutTabs = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  overflow-x: auto;
  margin-left: auto;

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    flex-direction: column;
    width: unset;
    overflow-x: unset;

    height: fit-content;
    overflow-y: auto;
    margin-left: unset;
    margin-top: auto;
  }
`

const AddSessionButton = styled(Button)`
  margin-top: 1em;
  flex-shrink: 0;
  margin-right: auto;

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    margin-right: unset;
    margin-bottom: auto;
  }
`

const ActiveSession = styled.section`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1em;
`

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
      <TabContainer>
        <WorkoutTabs>
          {sessions.map(
            (session): JSX.Element => (
              <SessionTab
                key={`session-tab-${session.id}`}
                session={session}
                onClick={(): void => onChangeSelectedSession(session.id)}
              />
            )
          )}
        </WorkoutTabs>
        <AddSessionButton
          size="big"
          circular
          icon="add"
          onClick={onAddSession}
        />
      </TabContainer>

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
