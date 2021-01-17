import React, { useState } from "react";
import styled from "styled-components";
import RoomsPage from "./components/RoomsPage";
import { colors } from "./defaultStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Main = () => {
  const [user, setUser] = useState(null);
  return (
    <MainWrapper>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/rooms">
            <RoomsPage user={user} onLogin={setUser} />
          </Route>
          <Route path="/team">
            <AboutPage />
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
