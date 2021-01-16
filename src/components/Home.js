import React from "react";
import styled from "styled-components";
import { useFirebase } from "../contexts/FirebaseContext";

import RoomController from "./RoomController";

const HomeWrapper = styled.div`
  padding: 50px;
`;

const Home = () => {
  const firebase = useFirebase();
  return (
    <HomeWrapper>
      <RoomController />
    </HomeWrapper>
  );
};

export default Home;
