import React from "react";
import styled from "styled-components";
import { colors } from "./defaultStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import StudyRoomsPage from "./pages/StudyRoomsPage";
import TeamPage from "./pages/TeamPage";
import PrivacyPage from "./pages/PrivacyPage";

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
            <StudyRoomsPage />
          </Route>
          <Route path="/team">
            <TeamPage />
          </Route>
          <Route path="/privacy">
            <PrivacyPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </MainWrapper>
  );
};

export default Main;
