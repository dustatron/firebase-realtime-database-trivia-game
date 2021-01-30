import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Button } from "react-bootstrap";

import { useUpdateUserLogin, useUserLogin } from "../../context/UserContext";

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({ loggedIn: true, uid: firebase.auth().currentUser.uid });
    } else {
      callback({ loggedIn: false });
    }
  });
}

const Nav = () => {
  const auth = firebase.auth();
  // const [user, setUser] = useState({ loggedIn: false });
  const user = useUserLogin();
  const setUser = useUpdateUserLogin();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  console.log("auth", auth.currentUser);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          McCord Trivia
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/chat">
                chat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/trivia">
                Trivia
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                About
              </Link>
            </li>
          </ul>
          <div className=" my-2 my-lg-0">
            {user.loggedIn ? (
              <Button onClick={signOut}> Sign Out </Button>
            ) : (
              <Button onClick={signInWithGoogle}> Sign In </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
