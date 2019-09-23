import React from "react"
import {
  WorkoutSession,
  WorkoutFieldValue,
  WorkoutData,
  WorkoutFieldType,
} from "../../types"
import { Table, Input, Dropdown, DropdownItemProps } from "semantic-ui-react"

interface Props {
  session: WorkoutSession
  onChangeSet: (
    sessionId: string,
    setId: string,
    fieldId: string,
    nextValue: WorkoutFieldValue
  ) => void
  onAddSet: (sessionId: string) => void
}

const WorkoutForm = ({
  session,
  onChangeSet,
  onAddSet,
}: Props): JSX.Element => {
  const { sets, workout } = session
  console.log(sets, workout)

  const inputType = (type: WorkoutFieldType): string => {
    if (type === WorkoutFieldType.Text) return "text"
    if (type === WorkoutFieldType.Number) return "number"
    if (type === WorkoutFieldType.Options) return "time"
    return "text"
  }

  const cellContent = (
    setId: string,
    data: WorkoutData
  ): JSX.Element | null => {
    switch (data.type) {
      case WorkoutFieldType.Text:
      case WorkoutFieldType.Number:
      case WorkoutFieldType.Time:
        return (
          <>
            <Input
              type={inputType(data.type)}
              value={data.value}
              onChange={(e, { value }): void =>
                onChangeSet(session.id, setId, data.id, value)
              }
            />
            {data.unit && <p>{data.unit}</p>}
          </>
        )

      case WorkoutFieldType.Options:
        return (
          <>
            <Dropdown
              options={data.options.map(
                (option): DropdownItemProps => ({
                  value: option.id,
                  label: option.name,
                  active: data.value && data.value.id === option.id,
                })
              )}
              onChange={(e, { value }): void =>
                onChangeSet(session.id, setId, data.id, value)
              }
            />
            {data.unit && <p>{data.unit}</p>}
          </>
        )

      default:
        console.error(
          "Unhandled workout data type, can't render cell content",
          data
        )
        return null
    }
  }

  return (
    <div>
      <h1>Sets</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            {workout.fields.map(
              (field): JSX.Element => (
                <Table.HeaderCell key={`headercell-${field.id}`}>
                  {field.name}
                </Table.HeaderCell>
              )
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sets.map(
            (set): JSX.Element => (
              <Table.Row key={`set-${set.id}`}>
                {workout.fields.map(
                  (field): JSX.Element => (
                    <Table.Cell key={`set-${set.id}-${field.name}`}>
                      {cellContent(set.id, set.data[field.id])}
                    </Table.Cell>
                  )
                )}
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default WorkoutForm
