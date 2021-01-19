import React, { useEffect } from "react";
import styled from "styled-components";
import { colors, fonts } from "../defaultStyles";
import * as firebaseui from "firebaseui";
import "firebase/auth";
import "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseContext";
import { IUser } from "../models/user";

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

interface ILoginMenuProps {
  onLogin: (user: IUser) => void;
}

const LoginMenu: React.FC<ILoginMenuProps> = ({ onLogin }) => {
  const firebase = useFirebase();

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (
          authResult: any,
          redirectUrl: string
        ) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.

          // Extract usefule data
          const {
            email,
            given_name,
            family_name,
          } = authResult.additionalUserInfo.profile;
          const user: IUser = {
            email: email,
            firstName: given_name,
            lastName: family_name,
            lastSeen: new Date(authResult.user.metadata.lastSignInTime),
            accessToken: authResult.credential.accessToken,
          };

          /*
          const email_ending = user.email.substring(user.email.length - 8);
          const valid = "ucsb.edu";
          if (valid !== email_ending) {
            alert("You need to log in through a valid UCSB email.");
            window.location.reload();
          }
          */

          onLogin(user);
          //Return false to let dev handle
          return false;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          const loaderElem = document.getElementById("loader");
          if (loaderElem) {
            loaderElem.style.display = "none";
          }
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
  }, [firebase, onLogin]);
  return (
    <FireBaseUIWrapper id="firebaseui-auth-container">
      <TitleLabel>Welcome to the Study Rooms!</TitleLabel>
      <SubTitleLabel>Please sign in with your UCSB Gmail account</SubTitleLabel>
      <div id="loader">Loading...</div>{" "}
    </FireBaseUIWrapper>
  );
};

export default LoginMenu;
