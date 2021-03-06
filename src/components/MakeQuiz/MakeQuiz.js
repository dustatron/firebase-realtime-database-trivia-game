import React, { useContext, useState } from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import {
  globalStateContext,
  globalDispatchContext,
} from "../../context/GlobalContext";
import { SAVE_QUIZ } from "../../context/constants";

const MakeQuiz = () => {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [roundsList, setRoundsList] = useState([]);

  const { fullQuizList } = useContext(globalStateContext);
  const dispatch = useContext(globalDispatchContext);

  function handleSubmit(e) {
    e.preventDefault();
    const newList = [fullQuizList[selected], ...roundsList];
    setRoundsList(newList);
  }

  function handleSaveQuiz() {
    const quiz = { rounds: roundsList, name };
    dispatch({ type: SAVE_QUIZ, payload: quiz });
  }

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="text-center">Make A quiz</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.SelectCustomSizeLg">
              <Form.Group>
                <Form.Label>Quiz Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name your quiz game"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Label>Select A Round</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                custom
                onChange={(e) => setSelected(e.target.value)}
              >
                <option>select a quiz</option>
                {fullQuizList.map((quiz, index) => (
                  <option value={index}>{quiz.title}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit">Add Round</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          {roundsList.map((round) => (
            <Card>
              <Card.Header>{round.title}</Card.Header>
              <Card.Body>{round.questions.length}</Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <Row>
        <Button onClick={handleSaveQuiz}>Save</Button>
      </Row>
    </>
  );
};

export default MakeQuiz;
