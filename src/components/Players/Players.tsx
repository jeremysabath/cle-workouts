import React from "react"
import { Dimmer, Loader } from "semantic-ui-react"
import { Player } from "../../types"

interface Props {
  loading: boolean
  error: string | null
  players: Player[]
  onSelect: (player: Player) => void
}

const Players = ({ loading, error, players, onSelect }: Props): JSX.Element => {
  return (
    <div>
      {error && <p>{error}</p>}
      {!loading && players.length === 0 && (
        <p>{`Couldn't find any players.`}</p>
      )}
      {!loading &&
        players.length > 0 &&
        players.map(
          (player): JSX.Element => (
            <div
              key={`player-list-${player.id}`}
              onClick={() => onSelect(player)}
            >
              <img src={player.imageSrc} alt={`${player.name}'s headshot`} />
              <p>{player.name}</p>
            </div>
          )
        )}

      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  )
}

export default Players
