import React, { useEffect } from "react";
import styled from "styled-components";
import { colors, fonts } from "../defaultStyles";
import * as firebaseui from "firebaseui";
import "firebase/auth";
import "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseContext";

const FireBaseUIWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TitleLabel = styled.span`
  font-family: ${fonts.primaryFont};
  color: ${colors.lightBlue};
  text-transform: uppercase;
  font-size: 2.5rem;
  line-height: 1em;
  margin-bottom: 1.5rem;
`;
const SubTitleLabel = styled.span`
  font-family: ${fonts.secondaryFont};
  color: ${colors.textSecondary};
  text-transform: uppercase;
  font-size: 1.4rem;
  line-height: 1em;
  margin-bottom: 1.5rem;
`;

const LoginMenu = ({ onAuthenticated }) => {
  const firebase = useFirebase();

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.

          // Extract usefule data
          const user = {};
          user["email"] = authResult.additionalUserInfo.profile.email;
          const email_ending = user.email.substring(user.email.length - 8);
          const valid = "ucsb.edu";
          if (valid !== email_ending) {
            alert("You need to log in through a valid UCSB email.");
            window.location.reload();
          }
          user["firstName"] = authResult.additionalUserInfo.profile.given_name;
          user["lastName"] = authResult.additionalUserInfo.profile.family_name;
          user["lastSeen"] = authResult.user.metadata.lastSignInTime;
          user["accessToken"] = authResult.credential.accessToken;
          onAuthenticated(user);
          //Return false to let dev handle
          return false;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        },
      },

      //Disable OpenID accountchooser
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,

      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      signInSuccessUrl: "/",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          scopes: ["https://www.googleapis.com/auth/calendar.events"],
        },
      ],
      // Terms of service url.
      tosUrl: "",
      // Privacy policy url.
      privacyPolicyUrl: "",
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }, [firebase, onAuthenticated]);
  return (
    <FireBaseUIWrapper id="firebaseui-auth-container">
      <TitleLabel>Welcome to the Study Rooms!</TitleLabel>
      <SubTitleLabel>Please sign in with your UCSB Gmail account</SubTitleLabel>
      <div id="loader">Loading...</div>{" "}
    </FireBaseUIWrapper>
  );
};

export default LoginMenu;
