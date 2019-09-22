import React from "react"
import styled from "styled-components"
import moment from "moment"
import { Button } from "semantic-ui-react"
import logo from "../../assets/logo.png"

interface Props {
  onStart: () => void
}

const greetingForTime = (): string => {
  const hour = Number(moment().format("HH"))
  if (hour >= 18 && hour < 3) return "Good evening."
  if (hour >= 3 && hour < 12) return "Good morning."
  if (hour >= 12 && hour < 18) return "Good afternoon."
  return "Hello"
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

const Start = ({ onStart }: Props): JSX.Element => (
  <Container>
    <Main>
      <Logo>
        <img src={logo} alt="Cavaliers shield" />
      </Logo>
      <Info>
        <h1>{greetingForTime()}</h1>
        <h2>{moment().format("MMMM D, YYYY")}</h2>
        <h2>{moment().format("h:mma")}</h2>
        <ThemeButton onClick={onStart}>Start workout</ThemeButton>
      </Info>
    </Main>
  </Container>
)

export default Start
