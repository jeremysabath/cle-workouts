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
  width: 70px;
  height: 70px;
  text-align: center;
  flex-shrink: 0;
  transition: all 0.2s;
  opacity: ${({ selected }): string => (selected ? "1.0" : "0.5")};
  background-color: ${({ theme, selected }): string =>
    selected ? "white" : "transparent"};
  margin: 0.5em;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: ${({ selected }): string =>
    selected ? "0px 2px 8px" : "0px 0px 2px"};

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
    width: 80px;
    height: 80px;
  }
`

const PlayerImage = styled.img`
  width: 135%;
  height: 135%;
  object-fit: contain;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const SessionTab = ({ session, onClick }: Props): JSX.Element => {
  const { player } = session

  return (
    <Tab selected={session.selected} onClick={onClick}>
      <PlayerImage src={player.imageSrc || logo} alt="" />
      {/* <h3>{player.nickname}</h3> */}
    </Tab>
  )
}

export default SessionTab
