import React, { useState } from "react"
import styled from "styled-components"
import { Popup, Button } from "semantic-ui-react"
import courtEmpty from "../../../assets/court-empty.png"
import courtTopSelected from "../../../assets/court-top-selected.png"
import { WorkoutSession, WorkoutFieldValue } from "../../../types"

interface Props {
  session: WorkoutSession
  onChangeSet: (
    sessionId: string,
    setId: string,
    fieldId: string,
    nextValue: WorkoutFieldValue
  ) => void
  onAddSet: (sessionId: string) => void
}

const Container = styled.div`
  position: relative;

  & img {
    width: 100%;
  }
`

const TopOfTheKey = styled.div`
  position: absolute;
  bottom: 0;
  top: 73%;
  left: 33%;
  right: 33%;
`

const PopupInner = styled.div`
  text-align: center;

  & h3 {
    margin-bottom: 0.5em;
  }

  & p {
    font-size: 1.1em;
    margin-bottom: 1em;
  }
`

const Buttons = styled.div`
  display: flex;

  & > *:first-child {
    margin-right: 1em;
  }
`

const StatOverlay = styled.div`
  position: absolute;
  bottom: 0;
  top: 73%;
  left: 33%;
  right: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`

const CourtLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 70%;
  bottom: 0;
`

const CourtRight = styled.div`
  position: absolute;
  top: 0;
  left: 70%;
  right: 0%;
  bottom: 0;
`

const CloseToBasket = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 58%;
`

const SpotUpShooting = ({
  session,
  onChangeSet,
  onAddSet,
}: Props): JSX.Element => {
  const [topSelected, setTopSelected] = useState(false)
  const [makes, setMakes] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const handleMake = (): void => {
    setMakes(prevMakes => prevMakes + 1)
    setAttempts(prevAttempts => prevAttempts + 1)
  }

  const handleMiss = (): void => {
    setAttempts(prevAttempts => prevAttempts + 1)
  }

  const percentage = (): string =>
    `${attempts > 0 ? Math.floor((makes / attempts) * 100) : 0}%`

  return (
    <Container>
      <img
        src={topSelected ? courtTopSelected : courtEmpty}
        alt={topSelected ? "court top of key 3 highlight" : "half court view"}
      />
      <CourtLeft onClick={(): void => setTopSelected(false)} />
      <CourtRight onClick={(): void => setTopSelected(false)} />
      <CloseToBasket onClick={(): void => setTopSelected(false)} />
      {!topSelected && attempts > 0 && (
        <StatOverlay>
          <p>
            {makes}/{attempts} ({percentage()})
          </p>
        </StatOverlay>
      )}
      <Popup
        trigger={
          <TopOfTheKey onClick={(): void => setTopSelected(!topSelected)} />
        }
        open={topSelected}
        position="top center"
      >
        <PopupInner>
          <h3>Top of the Key 3</h3>
          <p>
            {makes}/{attempts} ({percentage()})
          </p>
        </PopupInner>
        <Buttons>
          <Button positive onClick={handleMake} content="Make" />
          <Button negative onClick={handleMiss} content="Miss" />
        </Buttons>
      </Popup>
    </Container>
  )
}

export default SpotUpShooting
