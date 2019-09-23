import React from "react"
import styled from "styled-components"
import { WorkoutSession } from "../../types"
import logo from "../../assets/logo.png"

interface Props {
  session: WorkoutSession
  onClick: () => void
}

const Tab = styled.div`
  width: 90px;
  text-align: center;
  flex-shrink: 0;

  & img {
    width: 100%;
    object-fit: contain;
    object-position: bottom;
  }

  & h3 {
    font-size: 1.2em;
    margin: 0;
  }

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    width: 120px;
  }
`

const SessionTab = ({ session, onClick }: Props): JSX.Element => {
  const { player, workout } = session

  return (
    <Tab onClick={onClick}>
      <img src={player.imageSrc || logo} alt="" />
      <h3>{player.nickname}</h3>
      <p>{workout.name}</p>
    </Tab>
  )
}

export default SessionTab
