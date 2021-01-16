import React from "react";
import styled from "styled-components";
import { useFirebase } from "../contexts/FirebaseContext";

const TestButton = styled.button``;

const Home = () => {
  const firebase = useFirebase();

  const handleClick = () => {
    // do stuff with the firebase object given above
  };
  return (
    <div>
      <TestButton>Test Code</TestButton>
    </div>
  );
};

export default Home;
