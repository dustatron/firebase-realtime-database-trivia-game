import React, { useState } from "react";
import { Form, Card, Container, Row, Col, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import Question from "../Question";
import SaveButton from "./SaveButton";

const initialFormData = {
  name: "",
  amount: 10,
  category: "",
  difficulty: "",
  type: "",
};

const MakeQuiz = () => {
  const fetchQuiz = async () => {
    const { amount, category, difficulty, type } = formData;
    const data = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    const jsonData = data.json();
    return jsonData;
  };
  const [formData, setFormData] = useState(initialFormData);

  const { isLoading, isError, data, error, refetch } = useQuery(
    "quiz",
    fetchQuiz,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const handleChange = (e) => {
    const newState = { ...formData, [e.target.name]: e.target.value };
    setFormData(newState);
  };

  return (
    <Container style={{ paddingTop: "2em", marginBottom: "3em" }}>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Card>
            <Card.Header>
              <h2>Make A Quiz</h2>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  refetch();
                  console.log("submit", data);
                }}
              >
                <Form.Group controlId="quiz-name">
                  <Form.Label>Quiz Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={handleChange}
                    value={formData.name}
                    name="name"
                  />
                </Form.Group>
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
                <Button type="submit"> Generate </Button>
                {data && <SaveButton quiz={data.results} fetch={refetch} />}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {isLoading && <span>Loading...</span>}
        {isError && <span>Error: {error.message}</span>}
        {data &&
          data.results.map((que, index) => {
            return <Question number={index} q={que} key={index} />;
          })}
      </Row>
    </Container>
  );
};

export default MakeQuiz;
