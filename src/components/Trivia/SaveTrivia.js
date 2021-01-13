import React from "react";
import firebase from "firebase";

const SaveTrivia = ({ quiz }) => {
  const handleSaveQuiz = () => {
    firebase.database().ref("quizs").push(quiz);
  };
  return (
    <div>
      <button onClick={handleSaveQuiz}>Save quiz</button>
    </div>
  );
};

export default SaveTrivia;
