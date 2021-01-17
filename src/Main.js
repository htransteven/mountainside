import React from "react";
import styled from "styled-components";
import { FirebaseContextProvider } from "./contexts/FirebaseContext";
import RoomsPage from "./components/RoomsPage";
import { colors } from "./defaultStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Main = () => {
  return (
    <MainWrapper>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/rooms">
            <RoomsPage />
          </Route>
          <Route path="/about">
            <></>
          </Route>
          <Route path="/">
            <></>
          </Route>
        </Switch>
      </BrowserRouter>
    </MainWrapper>
  );
};

export default Main;
