import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "./App.css";

import SignIn from "./components/SingIn";
import ChatRoom from "./components/Chatroom";

import { useAuthState } from "react-firebase-hooks/auth";

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
  const [user] = useAuthState(auth);

  return <div className="App">{user ? <ChatRoom /> : <SignIn />}</div>;
}

export default App;
