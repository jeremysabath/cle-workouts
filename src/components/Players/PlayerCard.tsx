import React from "react"
import styled from "styled-components"
import { Player } from "../../types"
import logo from "../../assets/logo.png"

interface Props {
  player: Player
  onSelect: (player: Player) => void
}

const Container = styled.div`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  display: flex;

  & img {
    width: 30%
    max-height: 90px;
    padding-top: 0.5em;
    object-fit: contain;
    object-position: bottom;
    align-self: flex-end;
  }

  @media (min-width: ${({ theme }): string => theme.responsive.tablet}) {
    display: block;

    & img {
      width: 100%;
      max-height: unset;
      height: 180px;
      padding-top: 1em;
    }
  }
`

const Info = styled.div`
  padding: 0.5em;

  & h3 {
    margin: 0;
    font-size: 1.2em;
  }
`

const PlayerCard = ({ player, onSelect }: Props): JSX.Element => {
  const { name, number, position, imageSrc } = player
  return (
    <Container onClick={(): void => onSelect(player)}>
      <img src={imageSrc || logo} alt={`${name}'s headshot`} />
      <Info>
        <h3>{name}</h3>
        <p>{number ? `${number} • ${position}` : position}</p>
      </Info>
    </Container>
  )
}

export default PlayerCard
