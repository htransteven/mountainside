import React, {useEffect} from 'react';
import { render } from 'react-dom';

import "../css/loginmenu.css"

import logo from "../images/svg/symbol_gradient.svg";
import * as firebaseui from "firebaseui";
import "firebase/auth";
import "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseContext";



const LoginMenu = (props) => {
    const firebase = useFirebase();
  useEffect(() => {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          console.log(authResult);
          if(authResult.user.email == null){
            var date = new Date();
            var tempUser = "guest_" + date.getTime();
            props.handleLogin(tempUser);
          } else {
            props.handleLogin(authResult.user.email);
          }
          //Return false to let dev handle
          return false;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },

      //Disable OpenID accountchooser
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,

      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '',
      // Privacy policy url.
      privacyPolicyUrl: ''
    };
      ui.start('#firebaseui-auth-container', uiConfig);
  }, []);
  return(
        <div id="firebaseui-auth-container">
          {/* <img id="login-logo" src={logo}/>
          <div id="login-title">Visualization for Contact Tracing</div> */}
          <div id="login-subtitle">Please sign in to continue</div>
          <div id="login-subtitle2">If you don't have an account, start by entering an email.</div>
          <div id="loader">Loading...</div>
        </div>
      );
}

export default LoginMenu;
