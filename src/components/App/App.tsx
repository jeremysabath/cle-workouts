import React from "react"
import styled, { ThemeProvider } from "styled-components"
import Start from "../Start/Start"

const theme = {
  colors: {
    wine: "#6F263D",
    navy: "#041E42",
    gold: "#FFB81C",
    black: "#000000",
  },
  responsive: {
    phoneLandscape: "568px",
    tablet: "768px",
  },
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  @media (min-width: ${theme.responsive.tablet}) {
    font-size: 18px;
  }
`

const App = (): JSX.Element => {
  const handleStart = (): void => {
    console.log("Start!")
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Start onStart={handleStart} />
      </Container>
    </ThemeProvider>
  )
}

export default App
