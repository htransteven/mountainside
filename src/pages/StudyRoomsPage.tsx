import React, { useState } from "react";
import styled from "styled-components";
import LoginMenu from "../components/LoginMenu";

import UserInfo from "../components/UserInfo";
import RoomController from "../components/RoomController";
import study_room from "../images/studyroom.jpg";
import { dimensions } from "../defaultStyles";
import { UserContext } from "../contexts/UserContext";
import { IUser } from "../models/user";

const PageWrapper = styled.div<{ authenticated: boolean }>`
  padding: 30px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  min-height: calc(100vh - ${dimensions.navHeight});
  align-items: ${({ authenticated }) =>
    authenticated ? "flex-start" : "center"};
  justify-content: ${({ authenticated }) =>
    authenticated ? "flex-start" : "center"};
`;

const Background = styled.img`
  position: absolute;
  z-index: 0;
  opacity: 0.1;
  height: calc(100vh - ${dimensions.navHeight});
  width: 100%;
  pointer-events: none;
`;

const RoomsPage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  return (
    <UserContext.Provider value={user}>
      {!user && <Background src={study_room} />}
      <PageWrapper authenticated={!!user}>
        {!user && <LoginMenu onLogin={setUser} />}
        {user && <UserInfo />}
        {user && <RoomController />}
      </PageWrapper>
    </UserContext.Provider>
  );
};

export default RoomsPage;
