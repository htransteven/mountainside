import React from "react";
import styled from "styled-components";
import { FirebaseContextProvider } from "./contexts/FirebaseContext";
import Home from "./components/Home";
import { colors } from "./defaultStyles";

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Main = () => {
  return (
    <MainWrapper>
      <FirebaseContextProvider>
        <Home />
      </FirebaseContextProvider>
    </MainWrapper>
  );
};

export default Main;
