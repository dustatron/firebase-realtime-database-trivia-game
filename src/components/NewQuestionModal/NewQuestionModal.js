import React, { useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

const NewQuestionModal = ({
  showQuestion,
  setShowQuestion,
  questionData,
  setQuestionData,
  addQuestion,
}) => {
  const [q1, setQ1] = useState();
  const [q2, setQ2] = useState();
  const [q3, setQ3] = useState();

  const handleClose = () => {
    setShowQuestion(false);
  };

  const handleSave = () => {
    setShowQuestion(false);
    return addQuestion();
  };

  const { question, correct_answer, incorrect_answers } = questionData;

  const handleQuestion = (e) => {
    const updatedQuestion = { ...questionData, question: e.target.value };
    setQuestionData(updatedQuestion);
  };

  const handleCorrectQuestion = (e) => {
    const updatedQuestion = { ...questionData, correct_answer: e.target.value };
    setQuestionData(updatedQuestion);
  };

  const handleInCorrectQuestion0 = (e) => {
    const badAnswer = [...questionData.incorrect_answers];
    badAnswer[0] = e.target.value;
    const updatedQuestion = {
      ...questionData,
      incorrect_answers: [...badAnswer],
    };
    setQuestionData(updatedQuestion);
  };

  const handleInCorrectQuestion1 = (e) => {
    const badAnswer = [...questionData.incorrect_answers];
    badAnswer[1] = e.target.value;
    const updatedQuestion = {
      ...questionData,
      incorrect_answers: [...badAnswer],
    };
    setQuestionData(updatedQuestion);
  };

  const handleInCorrectQuestion2 = (e) => {
    const badAnswer = [...questionData.incorrect_answers];
    badAnswer[2] = e.target.value;
    const updatedQuestion = {
      ...questionData,
      incorrect_answers: [...badAnswer],
    };
    setQuestionData(updatedQuestion);
  };

  return (
    <Form>
      q
      <Modal show={showQuestion} onHide={handleClose} animation={true}>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Modal.Header closeButton>
              <Modal.Title>Custom Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="questions">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Question"
                  value={question}
                  onChange={handleQuestion}
                />
              </Form.Group>

              <Form.Group controlId="correct-answer">
                <Form.Label>Correct Answers</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Correct Answer"
                  value={correct_answer}
                  onChange={handleCorrectQuestion}
                />
              </Form.Group>

              <Form.Group controlId="bad-answer">
                <Form.Label>Incorrect Answer 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bad Answer"
                  value={incorrect_answers[0]}
                  onChange={handleInCorrectQuestion0}
                />
              </Form.Group>

              <Form.Group controlId="bad-answer">
                <Form.Label>Incorrect Answer 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bad Answer"
                  value={incorrect_answers[1]}
                  onChange={handleInCorrectQuestion1}
                />
              </Form.Group>

              <Form.Group controlId="bad-answer">
                <Form.Label>Incorrect Answer 3</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bad Answer"
                  value={incorrect_answers[2]}
                  onChange={handleInCorrectQuestion2}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
          </Col>
        </Row>
      </Modal>
    </Form>
  );
};

export default NewQuestionModal;
