import React from "react";
import firebase from "firebase";

const SingIn = () => {
  const auth = firebase.auth();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  if (auth.currentUser) {
    return (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    );
  }

  return <button onClick={signInWithGoogle}>Sign In</button>;
};

export default SingIn;
