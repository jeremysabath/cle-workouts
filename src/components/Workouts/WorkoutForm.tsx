import React from "react"
import {
  Table,
  Input,
  Dropdown,
  DropdownItemProps,
  Button,
} from "semantic-ui-react"
import styled from "styled-components"
import {
  WorkoutSession,
  WorkoutFieldValue,
  WorkoutData,
  WorkoutFieldType,
  WorkoutField,
} from "../../types"

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

const TableContainer = styled.section`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`

const CellContents = styled.div`
  display: flex;
  align-items: center;
`

const CellInput = styled(Input)<{ type: WorkoutFieldType }>`
  width: ${({ type }): string =>
    type === WorkoutFieldType.Options || type === WorkoutFieldType.Text
      ? "auto"
      : "100px"};

  & input {
    text-align: center !important;
  }
`

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
    if (type === WorkoutFieldType.Time) return "number" // TODO: find a better time input
    return "text"
  }

  const headerTitle = (field: WorkoutField): string => {
    if (field.unit) return `${field.name} (${field.unit})`
    return field.name
  }

  const tableCell = (setId: string, data: WorkoutData): JSX.Element | null => {
    console.log("cell content", setId, data)

    switch (data.type) {
      case WorkoutFieldType.Text:
      case WorkoutFieldType.Number:
      case WorkoutFieldType.Time:
        return (
          <Table.Cell key={`set-${setId}-${data.id}`}>
            <CellContents>
              <CellInput
                type={inputType(data.type)}
                value={data.value}
                // @ts-ignore
                onChange={(e, { value }): void =>
                  // eslint-disable-next-line
                  onChangeSet(session.id, setId, data.id, value)
                }
              />
            </CellContents>
          </Table.Cell>
        )

      case WorkoutFieldType.Options:
        return (
          <Table.Cell key={`set-${setId}-${data.id}`}>
            <CellContents>
              <Dropdown
                options={data.options.map(
                  (option): DropdownItemProps => ({
                    value: option.id,
                    text: option.name,
                    active: data.value === option.id,
                    selected: data.value === option.id,
                  })
                )}
                onChange={(e, { value }): void => {
                  console.log("onChange", e, value)
                  // @ts-ignore
                  // eslint-disable-next-line
                  onChangeSet(session.id, setId, data.id, value)
                }}
                value={data.value}
                placeholder="Select"
              />
            </CellContents>
          </Table.Cell>
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
      <TableContainer>
        <Table celled unstackable>
          <Table.Header>
            <Table.Row>
              {workout.fields.map(
                (field): JSX.Element => (
                  <Table.HeaderCell key={`headercell-${field.id}`}>
                    {headerTitle(field)}
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
                    (field): JSX.Element | null =>
                      tableCell(set.id, set.data[field.id])
                  )}
                </Table.Row>
              )
            )}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={workout.fields.length}>
                <Button
                  icon="add"
                  content="Add set"
                  onClick={(): void => onAddSet(session.id)}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </TableContainer>
    </div>
  )
}

export default WorkoutForm
