import React, { useState } from "react";
import firebase from "firebase";
import { InputGroup, FormControl, Button, Alert } from "react-bootstrap";

const SaveTrivia = ({ quiz, fetch }) => {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const errorConstant = "Please name your quiz.";

  const handleSaveQuiz = () => {
    if (data.length > 0) {
      const thisQuiz = { quiz: quiz, title: data };
      return firebase.database().ref("quizs").push(thisQuiz);
    }

    setError(errorConstant);
    return setTimeout(function () {
      setError(null);
    }, 2000);
  };
  return (
    <div>
      <Button
        onClick={() => {
          fetch();
        }}
      >
        New Quiz
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}
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
