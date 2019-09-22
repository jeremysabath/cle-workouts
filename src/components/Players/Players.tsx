import React, { useContext } from "react"
import { Card, Dimmer, Loader } from "semantic-ui-react"
// @ts-ignore
import { useMediaQuery } from "react-responsive"
import styled, { ThemeContext } from "styled-components"
import { Player } from "../../types"
import PlayerCard from "./PlayerCard"

interface Props {
  loading: boolean
  error: string | null
  players: Player[]
  onSelect: (player: Player) => void
}

const Container = styled.div``

const PlayerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  grid-gap: 1em;
`

const Players = ({ loading, error, players, onSelect }: Props): JSX.Element => {
  const theme = useContext(ThemeContext)
  console.log(theme)
  const isSmallLayout = useMediaQuery({ maxWidth: theme.responsive.tablet - 1 })

  return (
    <Container>
      {error && <p>{error}</p>}
      {!loading && players.length === 0 && (
        <p>{`Couldn't find any players.`}</p>
      )}
      {!loading && players.length > 0 && (
        <PlayerGrid>
          {players.map(
            (player): JSX.Element => (
              <PlayerCard
                key={`player-list-${player.id}`}
                player={player}
                onSelect={onSelect}
                small={isSmallLayout}
              />
            )
          )}
        </PlayerGrid>
      )}

      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </Container>
  )
}

export default Players
