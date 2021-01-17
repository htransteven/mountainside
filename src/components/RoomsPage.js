import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFirebase } from "../contexts/FirebaseContext";
import { useHistory } from "react-router-dom";

import UserInfo from "./UserInfo";
import RoomController from "./RoomController";

const PageWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const RoomsPage = ({ user }) => {
  const browserHistory = useHistory();
  const firebase = useFirebase();
  if (!user) {
    alert(
      "You must log in with your UCSB Gmail account before accessing the study rooms."
    );
    browserHistory.replace("/");
    return <></>;
  }
  return (
    <PageWrapper>
      <UserInfo user={user} />
      <RoomController user={user} />
    </PageWrapper>
  );
};

export default RoomsPage;
