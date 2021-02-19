import React from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

const NewQuestionModal = ({
  showQuestion,
  setShowQuestion,
  questionData,
  setQuestionData,
}) => {
  const handleClose = () => {
    setShowQuestion(false);
  };
  return (
    <>
      <Modal show={showQuestion} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewQuestionModal;
