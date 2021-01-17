import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFirebase } from "../contexts/FirebaseContext";
import { useHistory } from "react-router-dom";
import LoginMenu from "./LoginMenu.js";

import UserInfo from "./UserInfo";
import RoomController from "./RoomController";

const PageWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-flow: column nowrap;
  align-items: ${({ signedIn }) => (signedIn ? "flex-start" : "center")};
  justify-content: ${({ signedIn }) => (signedIn ? "flex-start" : "center")};
`;

const RoomsPage = ({ user, onLogin }) => {
  return (
    <PageWrapper signedIn={user}>
      {!user && <LoginMenu onAuthenticated={onLogin} />}
      {user && <UserInfo user={user} />}
      {user && <RoomController user={user} />}
    </PageWrapper>
  );
};

export default RoomsPage;
