import React from "react";
import firebase from "firebase";
import { Button } from "react-bootstrap";

const SingIn = () => {
  const auth = firebase.auth();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  if (auth.currentUser) {
    return (
      <Button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </Button>
    );
  }

  return <Button onClick={signInWithGoogle}>Sign In</Button>;
};

export default SingIn;
