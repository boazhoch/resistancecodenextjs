"use client";

import { Hub, Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

const Login = () => {
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  return (
    <button
      className="bg-blue-600 hover:text-blue-600 hover:bg-white text-white font-bold py-2 px-4 shadow-md rounded transition-all duration-200 ease-in-out"
      type="button"
      onClick={() => {
        Auth.federatedSignIn({
          provider: CognitoHostedUIIdentityProvider.Google,
        });
      }}
    >
      התחבר/י
    </button>
  );
};

export { Login };
