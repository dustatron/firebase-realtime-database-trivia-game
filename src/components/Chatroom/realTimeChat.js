/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import firebase from "firebase";

import { useList } from "react-firebase-hooks/database";

import ChatMessage from "../ChatMessage";

const realTimeChat = () => {
  const auth = firebase.auth();
  const dbRef = firebase.database().ref("list");

  const [messages, loading, error] = useList(dbRef);

  const [formValue, setFormValue] = useState("");

  const { uid, photoURL } = auth.currentUser;

  const sendMessage = async (e) => {
    e.preventDefault();
    firebase.database().ref("list").push({
      text: formValue,
      createdAt: Date.now(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  return (
    <div>
      <main>
        {error && <h2>Error: {error}</h2>}
        {loading && <h2>List: Loading...</h2>}
        {!loading && messages && (
          <>
            <h2>Messages:</h2>
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.val()} />
            ))}
          </>
        )}
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </div>
  );
};

export default realTimeChat;
