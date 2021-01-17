import React, { useState } from "react";
import styled from "styled-components";
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
  const [user, setUser] = useState(null);
  return (
    <MainWrapper>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/rooms">
            <RoomsPage user={user} onLogin={setUser} />
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
