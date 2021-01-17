import React from "react";
import styled from "styled-components";
import LoginMenu from "./LoginMenu.js";

import UserInfo from "./UserInfo";
import RoomController from "./RoomController";
import study_room from "../images/studyroom.jpg";
import { dimensions } from "../defaultStyles";

const PageWrapper = styled.div`
  padding: 30px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  min-height: calc(100vh - ${dimensions.navHeight});
  align-items: ${({ signedIn }) => (signedIn ? "flex-start" : "center")};
  justify-content: ${({ signedIn }) => (signedIn ? "flex-start" : "center")};
`;

const Background = styled.img`
  position: absolute;
  z-index: 0;
  opacity: 0.1;
  height: calc(100vh - ${dimensions.navHeight});
  width: 100%;
  pointer-events: none;
`;

const RoomsPage = ({ user, onLogin }) => {
  return (
    <>
      {!user && <Background src={study_room} />}
      <PageWrapper signedIn={user}>
        {!user && <LoginMenu onAuthenticated={onLogin} />}
        {user && <UserInfo user={user} />}
        {user && <RoomController user={user} />}
      </PageWrapper>
    </>
  );
};

export default RoomsPage;
