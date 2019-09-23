import React from "react"
import styled from "styled-components"
import { WorkoutSession } from "../../types"
import logo from "../../assets/logo.png"

interface Props {
  session: WorkoutSession
  onClick: () => void
}

const Tab = styled.div<{ selected: boolean }>`
  position: relative;
  width: 90px;
  text-align: center;
  flex-shrink: 0;
  transition: all 0.3s;
  opacity: ${({ selected }): string => (selected ? "1.0" : "0.5")};

  & h3 {
    font-size: 1.2em;
    margin: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}px) {
    width: 120px;
  }
`

const PlayerImage = styled.img`
  width: 100%;
  object-fit: contain;
  object-position: bottom;
`

const SessionTab = ({ session, onClick }: Props): JSX.Element => {
  const { player } = session

  return (
    <Tab selected={session.selected} onClick={onClick}>
      <PlayerImage src={player.imageSrc || logo} alt="" />
      <h3>{player.nickname}</h3>
    </Tab>
  )
}

export default SessionTab
