import React, { useState } from "react";
import styled from "styled-components";
import { FirebaseContextProvider } from "./contexts/FirebaseContext";
import RoomsPage from "./components/RoomsPage";
import { colors } from "./defaultStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useFirebase } from "./contexts/FirebaseContext";
import LoginMenu from "./components/LoginMenu.js";


const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.background};
`;

const Main = () => {
  const firebase = useFirebase();
  const [loggedIn, setLoggedIn] = useState(false);
  const db = firebase.firestore();

  const handleLogin = (user) => {
    console.log(user);
     /*
    document.getElementById("firebaseui-auth-container").style.display = "none";
    // let guestMode = false;
    // if(user.search("guest") >= 0){
    //   guestMode = true;
    // }

    var collection = this.db.collection("users");

    const db = this.db;
    collection.doc(user).get().then(function(doc){
      if (doc.exists) {
        doc.ref.update({
          lastSignedIn: firebase.firestore.Timestamp.fromDate(new Date()),
        });
        setLoggedIn(true);
        // self.setState({
        //   loggedIn: true,
        //   user: user,
        //   userID: doc.data().id,
        //   userNodeID: doc.data().userNodeID,
        //   guestMode: guestMode
        // })

        // return true bc user was found, returning false when user is not found
        return true;

      }
      return false;
    }).then(function(userFound) {
      if(!userFound){
        // attempts to get next user id, create user in db
        collection.doc("user-count").get().then(function(doc){
          if(doc.exists){
            return doc;
          }
          return -1;
        }).then(function(nextID){
          if(nextID.data().nextID < 0){
            //Couldn't find nextID
            return console.log("Couldn't find nextID");
          } else {
            //  figure out how to add user to db
          }
          return Promise.all(promises);
        });
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    }); */
  }

  return (
    <MainWrapper>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/rooms">
            <RoomsPage />
          </Route>
          <Route path="/about">
            <></>
          </Route>
          <Route path="/">
          <LoginMenu handleLogin={handleLogin}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </MainWrapper>
  );
};

export default Main;
