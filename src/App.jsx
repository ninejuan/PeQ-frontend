import "./App.css";
import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "./constants/Colors";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Noto Sans KR", "Pretendard Variable", Pretendard, sans-serif;
  }

  body {
    background-color: ${Colors.BACKGROUND};
    display: block;
  }
`;

const AppContainer = styled.div`
  max-width: 100vw;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden !important;
`;

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <AppContainer>
        <Outlet></Outlet>
      </AppContainer>
    </>
  );
}

export default App;
