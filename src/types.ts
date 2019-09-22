export interface Player {
  id: string
  name: string
  nickname: string
  imageSrc?: string
  number?: string
  position: string
}

export interface WorkoutCategory {
  id: string
  name: string
  iconSrc: string
}

export enum WorkoutFieldType {
  Number = "Number",
  Text = "Text",
  Options = "Options",
  Time = "Time",
}

export interface BaseWorkoutField {
  id: string
  name: string
  type: WorkoutFieldType
  unit?: string
}

export interface OptionsWorkoutField extends BaseWorkoutField {
  type: WorkoutFieldType.Options
  options: { id: string; name: string }[]
}

export type WorkoutField = BaseWorkoutField | OptionsWorkoutField

export interface Workout {
  id: string
  name: string
  category: WorkoutCategory
  fields: WorkoutField[]
}

export interface NewWorkoutSession {
  player?: Player | null
  workout?: Workout | null
  date: Date
}

export interface WorkoutSession {
  id: string
  player: Player
  workout: Workout
  date: Date
}
