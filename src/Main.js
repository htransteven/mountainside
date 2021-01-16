import React from "react";
import { FirebaseContextProvider } from "./contexts/FirebaseContext";
import Home from "./components/Home";

const Main = () => {
  return (
    <FirebaseContextProvider>
      <Home />
    </FirebaseContextProvider>
  );
};

export default Main;
