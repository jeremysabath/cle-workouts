import React from "react"
import styled from "styled-components"
import { Player } from "../../types"
import logo from "../../assets/logo.png"

interface Props {
  player: Player
  onSelect: (player: Player) => void
  small?: boolean
}

const Container = styled.div<{ small?: boolean }>`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  display: ${({ small }): string => (small ? "flex" : "block")};

  & img {
    width: ${({ small }): string => (small ? "30%" : "100%")};
    max-height: ${({ small }): string => (small ? "90px" : "unset")};
    height: ${({ small }): string => (small ? "unset" : "180px")};
    padding-top: ${({ small }): string => (small ? "0.5em" : "1em")};
    object-fit: contain;
    object-position: bottom;
    align-self: flex-end;
  }
`

const Info = styled.div`
  padding: 0.5em;

  & h3 {
    margin: 0;
    font-size: 1.2em;
  }
`

const PlayerCard = ({ player, onSelect, small }: Props): JSX.Element => {
  const { name, number, position, imageSrc } = player
  return (
    <Container onClick={(): void => onSelect(player)} small={small}>
      <img src={imageSrc || logo} alt={`${name}'s headshot`} />
      <Info>
        <h3>{name}</h3>
        <p>{number ? `${number} • ${position}` : position}</p>
      </Info>
    </Container>
  )
}

export default PlayerCard
