import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/Home";
import ChatRoom from "./components/Chatroom";
import Trivia from "./components/Trivia";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCpR_WqSfe8yvX8bAEAIVw_tWuiT4Oi8Eo",
    authDomain: "trivia-game-e5783.firebaseapp.com",
    databaseURL: "https://trivia-game-e5783-default-rtdb.firebaseio.com",
    projectId: "trivia-game-e5783",
    storageBucket: "trivia-game-e5783.appspot.com",
    messagingSenderId: "691408243393",
    appId: "1:691408243393:web:984c6e2f3a1f3c1d5de240",
    measurementId: "G-316XKN8TRJ",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();

function App() {
  return (
    <Router>
      <Container>
        <Nav />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>

          <PrivateRoute component={ChatRoom} path="/chat" />
          <PrivateRoute component={Trivia} path="/trivia" />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
