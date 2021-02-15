import React, { useState } from "react";
import firebase from "firebase";
import {
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

const MakeQuiz = () => {
  const auth = firebase.auth();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const ERROR_NEED_NAME = "Please name your quiz.";
  const ERROR_TO_LONG = "Your quiz name is too long.";

  const showError = (err) => {
    setError(err);
    return setTimeout(function () {
      setError(null);
    }, 5000);
  };

  const handleSave = () => {
    if (!name) {
      return showError(ERROR_NEED_NAME);
    }

    if (name.length > 20) {
      return showError(ERROR_TO_LONG);
    }
    const { uid } = auth.currentUser;

    const thisQuiz = {
      title: name,
      quiz: {},
    };

    return firebase
      .database()
      .ref("quizzes/" + uid)
      .push(thisQuiz);
  };

  return (
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <div className="make-quiz__top-margin"></div>
        <Card>
          <Card.Header>
            <h2>Start A New Quiz</h2>
          </Card.Header>
          <Card.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Quiz Name"
                aria-label="Name your Quiz"
                aria-describedby="basic-addon2"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <InputGroup.Append>
                <Button
                  type="submit"
                  variant="outline-secondary"
                  onClick={handleSave}
                >
                  Start
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible
              >
                {" "}
                {error}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MakeQuiz;
