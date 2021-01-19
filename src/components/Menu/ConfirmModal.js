import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ConfirmModel({ del, show, setShow, quiz }) {
  const handleClose = () => setShow(false);
  const handleDelete = () => del();
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {quiz.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {quiz.title}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Nope
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModel;
