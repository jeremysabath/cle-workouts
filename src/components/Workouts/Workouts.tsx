import React, { useState } from "react"
import styled from "styled-components"
import { Button, Table } from "semantic-ui-react"
import { Workout, WorkoutCategory } from "../../types"
import sortBy from "lodash.sortby"

interface Props {
  loading: boolean
  error: string | null
  workouts: Workout[]
  onSelect: (workout: Workout) => void
  hideCategories: boolean
}

const Container = styled.div``

const WorkoutsContainer = styled.div``

const WorkoutsList = styled.div``

const Categories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 1em;

  @media (min-width: ${({ theme }): string => theme.responsive.tablet}px) {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }

  @media (min-width: ${({ theme }): string => theme.responsive.largeTablet}px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`

const CategoryButton = styled(Button)<{ selected: boolean }>`
  && {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ selected, theme }): string =>
      selected ? ` ${theme.colors.gold} !important;` : "unset"};
    margin: 0;
    color: rgba(0, 0, 0, 0.8) !important;
  }

  & img {
    position: absolute;
    left: 1em;
    height: 28px;
  }
`

const WorkoutListRow = styled(Table.Row)`
  padding: 0.5em 0 !important;
`

const WorkoutListCell = styled(Table.Cell)`
  & h3 {
    margin-bottom: 0.25em;
    font-size: 1.2em;
  }

  & div {
    display: flex;

    & p {
      margin: 0;
      font-weight: 500;

      &:last-child {
        margin-left: auto;
      }
    }
  }
`

const Workouts = ({
  loading,
  error,
  workouts,
  onSelect,
  hideCategories,
}: Props): JSX.Element => {
  const categories: WorkoutCategory[] = []
  console.log("workouts: ", workouts)
  workouts.forEach(
    (workout): void => {
      const match = categories.find(
        (category): boolean => workout.category.id === category.id
      )
      if (!match) categories.push(workout.category)
    }
  )
  console.log("categories: ", categories)
  const sortedCategories = sortBy(categories, ["name"])

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<WorkoutCategory | null>(null)

  const filteredWorkouts = selectedCategory
    ? workouts.filter(
        (workout): boolean => selectedCategory.id === workout.category.id
      )
    : workouts

  return (
    <Container>
      {error && <p>{error}</p>}
      {!loading && workouts.length === 0 && (
        <p>{`Couldn't find any workouts.`}</p>
      )}
      {!loading && workouts.length > 0 && (
        <WorkoutsContainer>
          {!hideCategories && (
            <Categories>
              {sortedCategories.map(
                (category): JSX.Element | null => {
                  const selected = !!(
                    selectedCategory && selectedCategory.id === category.id
                  )
                  return (
                    <CategoryButton
                      key={`workout-category-${category.id}`}
                      selected={selected}
                      onClick={(): void =>
                        setSelectedCategory(selected ? null : category)
                      }
                    >
                      <img src={category.iconSrc} alt="" />
                      <p>{category.name}</p>
                    </CategoryButton>
                  )
                }
              )}
            </Categories>
          )}
          {filteredWorkouts.length > 0 && (
            <Table striped>
              <Table.Body>
                {filteredWorkouts.map(
                  (workout): JSX.Element => (
                    <WorkoutListRow
                      key={`workout-${workout.id}`}
                      onClick={(): void => onSelect(workout)}
                    >
                      <WorkoutListCell style={{ padding: "0 1em !important" }}>
                        <h3>{workout.name}</h3>
                        <div>
                          <p>{workout.category.name}</p>
                          <p>Last: 9/22/19</p>
                        </div>
                      </WorkoutListCell>
                    </WorkoutListRow>
                  )
                )}
              </Table.Body>
            </Table>
          )}
        </WorkoutsContainer>
      )}
    </Container>
  )
}

export default Workouts
