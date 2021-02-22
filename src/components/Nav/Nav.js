import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Button } from "react-bootstrap";
import {
  globalStateContext,
  globalDispatchContext,
} from "../../context/GlobalContext";
import { LOG_USER_IN, LOG_USER_OUT } from "../../context/constants";

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({
        type: LOG_USER_IN,
        payload: { isloggedIn: true, uid: firebase.auth().currentUser.uid },
      });
    } else {
      callback({
        type: LOG_USER_OUT,
        payload: { isloggedIn: false, uid: null },
      });
    }
  });
}

const Nav = () => {
  const auth = firebase.auth();
  const { isloggedIn } = useContext(globalStateContext);
  const dispatch = useContext(globalDispatchContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(dispatch);

    return () => {
      unsubscribe();
    };
  }, [dispatch, isloggedIn]);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signOut = () => {
    auth.signOut();
  };

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
            {isloggedIn ? (
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
