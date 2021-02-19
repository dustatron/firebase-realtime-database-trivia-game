import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateQuizList, useQuizList } from "../../context/QuizListContext";
import { Card, Button, Row, Col } from "react-bootstrap";
import GenerateModal from "../Generator";
import NewQuestionModal from "../NewQuestionModal";

const initialFormData = {
  name: "",
  amount: 3,
  category: "",
  difficulty: "",
  type: "",
};

const EditRound = () => {
  const [thisQuiz, setThisQuiz] = useState("");
  const [quizIndex, setQuizIndex] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionData, setQuestionData] = useState("");

  const { quizKey } = useParams();
  const allQuizzes = useQuizList();

  useEffect(() => {
    if (!thisQuiz || thisQuiz.key !== quizKey) {
      const currentQuiz = allQuizzes.find((q) => q.key === quizKey);
      setThisQuiz(currentQuiz);
      setQuizIndex(
        allQuizzes.findIndex((q) => {
          return q.key === quizKey;
        })
      );
    }
  }, [allQuizzes, quizKey, thisQuiz]);

  const generateRound = async () => {
    console.log("Generate Round");
    // const roundData = await fetchQuiz();
    // return updateRoundData(roundData);
  };

  const handleShowQuestion = () => {
    setShowQuestion(true);
  };

  const handleShowGenerator = () => {
    setShowModal(true);
  };

  return (
    <>
      <NewQuestionModal
        showQuestion={showQuestion}
        setShowQuestion={setShowQuestion}
        questionData={questionData}
        setQuestionData={setQuestionData}
      />
      <GenerateModal
        show={showModal}
        setShow={setShowModal}
        getQuestions={generateRound}
        formData={formData}
        setFormData={setFormData}
      />

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Header>
              <h2 className="text-center">"{thisQuiz && thisQuiz.title}"</h2>
            </Card.Header>
            <Card.Body className="text-center">
              <Button variant="warning" onClick={handleShowQuestion}>
                ➕ Question
              </Button>
              <Button variant="info" onClick={handleShowGenerator}>
                🤖 Generate
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditRound;
