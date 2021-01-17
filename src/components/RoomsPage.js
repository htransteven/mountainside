import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFirebase } from "../contexts/FirebaseContext";

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
  const firebase = useFirebase();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // get all available rooms from firestore
    setUser({
      first_name: "Steven",
      last_name: "Huynh-Tran",
      email: "email@example.com",
    });
  }, []);

  return (
    <PageWrapper>
      <UserInfo user={user} />
      <RoomController user={user} />
    </PageWrapper>
  );
};

export default RoomsPage;
