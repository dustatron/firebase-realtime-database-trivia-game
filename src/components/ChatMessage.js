import React from "react";
import firebase from "firebase";
import stockImage from "../media/adorableAvitar.png";

const ChatMessage = ({ message: { text, uid, photoURL } }) => {
  const auth = firebase.auth();
  const getImage = () => {
    if (photoURL && photoURL.length > 2) {
      return photoURL;
    }
    return stockImage;
  };
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={getImage()} alt="user" />
        <p>{text}</p>
      </div>
    </>
  );
};

export default ChatMessage;
