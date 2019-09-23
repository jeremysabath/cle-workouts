import React, { useState } from "react"
import styled from "styled-components"
import { Button, TextArea, Form } from "semantic-ui-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { WorkoutSession, WorkoutFieldValue } from "../../types"
import CustomWorkout from "./CustomWorkout"
import WorkoutForm from "./WorkoutForm"
import SessionTab from "./SessionTab"

interface Props {
  sessions: WorkoutSession[]
  onChangeSessionDate: (sessionId: string, date: Date | null) => void
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
  background-color: rgba(71, 15, 35, 0.7);
  box-shadow: inset 0px 10px 9px -9px rgba(0, 0, 0, 0.5);

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    flex-direction: column;
    box-shadow: inset -10px 0px 9px -9px rgba(0, 0, 0, 0.5);
  }
`

const WorkoutTabs = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  overflow-x: auto;
  overflow-y: hidden;
  margin-left: auto;

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    flex-direction: column;
    width: unset;
    overflow-x: hidden;

    height: fit-content;
    overflow-y: auto;
    margin-left: unset;
    margin-top: auto;
  }
`

const AddSessionButton = styled(Button)`
  flex-shrink: 0;
  margin: 0 auto 0 0.5em;
  box-shadow: 0px 2px 8px;
  color: ${({ theme }): string => theme.colors.wine};
  background-color: white;

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    margin: 0.5em 0 auto 0;
  }
`

const ActiveSession = styled.section`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1em;

  & > h1 {
    margin-bottom: 0.25em;
  }
`

const SessionMeta = styled.div`
  display: flex;
  align-items: baseline;

  & > h2 {
    margin-top: 0;
    margin-bottom: 1.5em;
    font-size: 1em;
    font-weight: 500;
    margin-right: 1em;
  }
`

const DateTimePicker = styled.div`
  display: flex;
  justify-content: flex-start;

  & .cavs-date-picker {
    border: none;
    padding: 0;
    display: block;
    font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
    line-height: 1.28571429em;
    color: #4183c4;
    text-decoration: underline;
    outline: none;

    &--date {
      text-align: right;
      width: 5em;
    }

    &--time {
      text-align: left;
      width: 4.375em;
    }
  }

  & .react-datepicker--time-only {
    & .react-datepicker__triangle {
      border-bottom-color: white;
    }

    & .react-datepicker__header {
      display: none;
    }
  }

  & .react-datepicker__time-list-item {
    height: unset !important;
    padding: 0.8em !important;
  }

  & span {
    z-index: 1;
    margin: 0 0.5em;
    color: #4183c4;
  }
`

const SessionContent = styled.div`
  & > * {
    margin-bottom: 1em;
  }

  @media (min-width: ${({ theme }): string => theme.responsive.largeTablet}px) {
    display: flex;
    flex-wrap: wrap;

    & > *:first-child {
      flex: 3;
      margin-right: 1em;
    }
  }
`

const Sidebar = styled.section`
  height: 100%;
  flex: 2;

  & > form {
    margin-bottom: 1em;
  }
`

const CompleteButton = styled(Button)`
  width: 100%;
`

const ActiveSessions = ({
  sessions,
  onChangeSessionDate,
  onChangeSet,
  onAddSet,
  onChangeSelectedSession,
  onAddSession,
}: Props): JSX.Element => {
  const selectedSession = sessions.find((session): boolean => session.selected)

  const [requestComplete, setRequestComplete] = useState(false)

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
          <SessionMeta>
            <h2>{selectedSession.workout.name}</h2>
            <DateTimePicker>
              <DatePicker
                dateFormat="M/d/yyyy"
                selected={selectedSession.date}
                onChange={(date): void =>
                  onChangeSessionDate(selectedSession.id, date)
                }
                todayButton="Today"
                className="cavs-date-picker cavs-date-picker--date"
              />
              <span> @ </span>
              <DatePicker
                dateFormat="h:mm aa"
                selected={selectedSession.date}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                onChange={(date): void =>
                  onChangeSessionDate(selectedSession.id, date)
                }
                className="cavs-date-picker cavs-date-picker--time"
              />
            </DateTimePicker>
          </SessionMeta>
          <SessionContent>
            {selectedSession.workout.hasCustomForm ? (
              <CustomWorkout
                session={selectedSession}
                onChangeSet={onChangeSet}
                onAddSet={onAddSet}
              />
            ) : (
              <WorkoutForm
                session={selectedSession}
                onChangeSet={onChangeSet}
                onAddSet={onAddSet}
              />
            )}
            <Sidebar>
              <Form>
                <TextArea placeholder="Notes" />
              </Form>
              <CompleteButton
                onClick={(): void => setRequestComplete(true)}
                content="Complete workout"
                size="huge"
              />
            </Sidebar>
          </SessionContent>
        </ActiveSession>
      )}
    </Container>
  )
}

export default ActiveSessions
