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
  align-items: flex-start;
  justify-content: flex-start;
`;

const RoomsPage = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <PageWrapper>
      {!user && <LoginMenu handleLogin={handleLogin} />}
      {user && <UserInfo user={user} />}
      {user && <RoomController user={user} />}
    </PageWrapper>
  );
};

export default RoomsPage;
