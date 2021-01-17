import React, { useState } from "react";
import firebase from "firebase";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const SaveTrivia = ({ quiz }) => {
  const [data, setData] = useState("");

  const handleSaveQuiz = () => {
    const thisQuiz = { quiz: quiz, title: data };
    firebase.database().ref("quizs").push(thisQuiz);
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleSaveQuiz}>
            Save
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default SaveTrivia;
