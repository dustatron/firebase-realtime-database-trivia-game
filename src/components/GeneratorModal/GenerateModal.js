import React from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

const GenerateModal = ({
  show,
  setShow,
  getQuestions,
  formData,
  setFormData,
}) => {
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const newState = { ...formData, [e.target.name]: e.target.value };
    setFormData(newState);
  };

  const handleGenerate = () => {
    getQuestions();
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make A Quiz</Modal.Title>
        </Modal.Header>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                // refetch();
              }}
            >
              <Form.Group controlId="amount">
                <Form.Label>Number of Questions</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Select Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="any">Any Category</option>
                  <option value="9">General Knowledge</option>
                  <option value="10">Entertainment: Books</option>
                  <option value="11">Entertainment: Film</option>
                  <option value="12">Entertainment: Music</option>
                  <option value="13">
                    Entertainment: Musicals &amp; Theatres
                  </option>
                  <option value="14">Entertainment: Television</option>
                  <option value="15">Entertainment: Video Games</option>
                  <option value="16">Entertainment: Board Games</option>
                  <option value="17">Science &amp; Nature</option>
                  <option value="18">Science: Computers</option>
                  <option value="19">Science: Mathematics</option>
                  <option value="20">Mythology</option>
                  <option value="21">Sports</option>
                  <option value="22">Geography</option>
                  <option value="23">History</option>
                  <option value="24">Politics</option>
                  <option value="25">Art</option>
                  <option value="26">Celebrities</option>
                  <option value="27">Animals</option>
                  <option value="28">Vehicles</option>
                  <option value="29">Entertainment: Comics</option>
                  <option value="30">Science: Gadgets</option>
                  <option value="31">
                    Entertainment: Japanese Anime &amp; Manga
                  </option>
                  <option value="32">
                    Entertainment: Cartoon &amp; Animations
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="difficulty">
                <Form.Label>Select Difficulty</Form.Label>
                <Form.Control
                  as="select"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option value="any">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="type">
                <Form.Label>Select Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="any">Any Type</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / False</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleGenerate}> Generate </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GenerateModal;
