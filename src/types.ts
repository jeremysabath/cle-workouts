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

export interface OptionsWorkoutData extends OptionsWorkoutField {
  value?: string // the option ID
}

export interface TextWorkoutField extends BaseWorkoutField {
  type: WorkoutFieldType.Text
}

export interface TextWorkoutData extends TextWorkoutField {
  value?: string
}

export interface NumberWorkoutField extends BaseWorkoutField {
  type: WorkoutFieldType.Number
}

export interface NumberWorkoutData extends NumberWorkoutField {
  value?: number
}

export interface TimeWorkoutField extends BaseWorkoutField {
  type: WorkoutFieldType.Time
}

export interface TimeWorkoutData extends TimeWorkoutField {
  value?: string // can enhance with better type safety around time strings
}

export type WorkoutField =
  | OptionsWorkoutField
  | TextWorkoutField
  | NumberWorkoutField
  | TimeWorkoutField

export type WorkoutData =
  | OptionsWorkoutData
  | TextWorkoutData
  | NumberWorkoutData
  | TimeWorkoutData

export type WorkoutFieldValue = string | number

export interface Workout {
  id: string
  name: string
  category: WorkoutCategory
  fields: WorkoutField[]
  hasCustomForm?: boolean
}

export interface WorkoutSet {
  id: string
  data: {
    [id: string]: WorkoutData
  }
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
  sets: WorkoutSet[]
  date: Date
  selected: boolean
}
