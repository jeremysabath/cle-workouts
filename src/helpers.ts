import moment from "moment"
import { Player, Workout } from "./types"

export const randomId = (): string =>
  String(Math.floor(Math.random() * 10000000))

/** Returns a Date object with time rounded down to nearest 15-minute mark */
export const roundedDate = (): Date => {
  const now = moment()
  const roundedDown = Math.floor(now.minute() / 15) * 15
  now.minutes(roundedDown)
  now.seconds(0)
  now.milliseconds(0)

  return now.toDate()
}

export const isPlayer = (player?: Player): boolean => {
  if (!player) return false
  if (!player.id) return false
  if (!player.name) return false
  if (!player.nickname) return false
  if (!player.position) return false
  return true
}

export const isWorkout = (workout?: Workout): boolean => {
  if (!workout) return false
  if (!workout.id) return false
  if (!workout.name) return false
  if (!workout.fields) return false
  if (!workout.category) return false
  return true
}
