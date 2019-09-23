import { Player, Workout } from "./types"
import sortBy from "lodash.sortby"

// Dummy data
import dummyPlayers from "./dummy/players"
import dummyWorkouts from "./dummy/workouts"

const getPlayers = async (): Promise<Player[]> => {
  // TODO: Actually get players via API

  await new Promise((resolve): number => window.setTimeout(resolve, 500))
  return dummyPlayers
}

const getWorkouts = async (): Promise<Workout[]> => {
  // TODO: Actually get workouts via API

  await new Promise((resolve): number => window.setTimeout(resolve, 500))

  // Sort workouts by name.
  const sorted = sortBy(dummyWorkouts, ["name"])
  return sorted
}

export default {
  getPlayers,
  getWorkouts,
}
