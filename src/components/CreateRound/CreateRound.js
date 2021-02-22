import React, { useState, useContext } from "react";
import firebase from "firebase";
import { globalStateContext } from "../../context/GlobalContext";
import { useHistory } from "react-router-dom";
import { useUpdateQuizList } from "../../context/QuizListContext";
import { useList } from "react-firebase-hooks/database";

import {
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

const CreateRound = () => {
  const auth = firebase.auth();
  const { uid } = useContext(globalStateContext);

  const dbRef = firebase.database().ref("quizzes/" + uid);
  const updateQuizList = useUpdateQuizList();
  const history = useHistory();

  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  /* Error Copy */
  const ERROR_NEED_NAME = "Please name your quiz round.";
  const ERROR_TO_LONG = "Your quiz round name is too long.";

  const [quizzes] = useList(dbRef);

  const showError = (err) => {
    setError(err);
    return setTimeout(function () {
      setError(null);
    }, 5000);
  };

  const validateName = () => {
    if (!name) {
      showError(ERROR_NEED_NAME);
      return false;
    }
    if (name.length > 20) {
      showError(ERROR_TO_LONG);
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateName()) {
      return;
    }

    const initRound = {
      title: name,
      quiz: {},
    };

    /* Write to Firebase */
    const { uid } = auth.currentUser;
    const newRound = await firebase
      .database()
      .ref("quizzes/" + uid)
      .push(initRound);

    /* Update context data from firebase */
    const quizList = await quizzes.map((q) => {
      return { ...q.val(), key: q.key };
    });
    await updateQuizList(quizList);

    /* redirect to new round */
    history.push(`/trivia/edit-round/${newRound.getKey()}`);
  };

  return (
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <div className="make-quiz__top-margin"></div>
        <Card>
          <Card.Header>
            <h2>Create Round</h2>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSave}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Name Round"
                  aria-label="Name Round"
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
                    // onClick={handleSave}
                  >
                    Create
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </form>
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

export default CreateRound;
