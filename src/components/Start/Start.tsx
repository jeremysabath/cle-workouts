import React, { useState } from "react"
import styled from "styled-components"
import moment from "moment"
import { Button } from "semantic-ui-react"
import useInterval from "@use-it/interval"
import logo from "../../assets/logo.png"

interface Props {
  onStart: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }): string => theme.colors.wine};
  color: white;
  height: 100%;
  width: 100%;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}) {
    flex-direction: row;
  }
`

const Logo = styled.div`
  flex: 2;
  text-align: center;
  margin-bottom: 1em;

  & img {
    width: 30%;
  }

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}) {
    text-align: right;
    margin: 0;

    & img {
      width: 50%;
    }
  }
`

const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 0.5em 0;
  text-align: center;
  align-items: center;

  & h1 {
    font-size: 2.25em;
    margin-bottom: 0.5em;
  }

  & h2 {
    margin: 0;
    font-size: 1.25em;
    font-weight: 500;
  }

  & button {
    margin-top: 2em;
    font-size: 1em;
  }

  @media (min-width: ${({ theme }): string =>
      theme.responsive.phoneLandscape}) {
    text-align: left;
    align-items: unset;
    margin-left: 2em;

    & img {
      width: 50%;
    }
  }
`

const ThemeButton = styled(Button)`
  background-color: ${({ theme }): string => theme.colors.gold};
  color: ${({ theme }): string => theme.colors.wine};
  width: fit-content;
`

const Start = ({ onStart }: Props): JSX.Element => {
  const greetingForTime = (): string => {
    const hour = Number(moment().format("HH"))
    if (hour >= 18 && hour < 3) return "Good evening."
    if (hour >= 3 && hour < 12) return "Good morning."
    if (hour >= 12 && hour < 18) return "Good afternoon."
    return "Hello"
  }

  const [greeting, setGreeting] = useState(greetingForTime())
  const [date, setDate] = useState(moment().format("MMMM D, YYYY"))
  const [time, setTime] = useState(moment().format("h:mm a"))

  // Update date, time, and greeting every 10 seconds.
  useInterval((): void => {
    setGreeting(greetingForTime())
    setDate(moment().format("MMMM D, YYYY"))
    setTime(moment().format("h:mm a"))
  }, 10000)

  return (
    <Container>
      <Main>
        <Logo>
          <img src={logo} alt="Cavaliers shield" />
        </Logo>
        <Info>
          <h1>{greeting}</h1>
          <h2>{date}</h2>
          <h2>{time}</h2>
          <ThemeButton onClick={onStart}>Start workout</ThemeButton>
        </Info>
      </Main>
    </Container>
  )
}

export default Start
