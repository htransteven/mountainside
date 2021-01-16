import React, { createContext, useContext, useMemo } from "react";
import firebase from "firebase/app";
import "firebase/analytics";

const firebaseContext = createContext(null);

export const useFirebase = () => {
  const api = useContext(firebaseContext);
  if (api === null) {
    throw Error("No Firebase Client");
  } else {
    return api;
  }
};

export const FirebaseContextProvider = (props) => {
  const { children } = props;

  const api = useMemo(() => {
    if (!firebase.apps.length) {
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
        apiKey: "AIzaSyCLjjocBd6knznThqo-sj8R1lklA_nh_sE",
        authDomain: "mountainside-web.firebaseapp.com",
        databaseURL: "https://mountainside-web-default-rtdb.firebaseio.com",
        projectId: "mountainside-web",
        storageBucket: "mountainside-web.appspot.com",
        messagingSenderId: "172167487093",
        appId: "1:172167487093:web:092a76463536531e50a23c",
        measurementId: "G-BBS5XHHSTF",
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    } else {
      firebase.app();
    }
    return firebase;
  }, []);

  return (
    <firebaseContext.Provider value={api}>{children}</firebaseContext.Provider>
  );
};
