import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateQuizList, useQuizList } from "../../context/QuizListContext";
import { Card, Button, Row, Col } from "react-bootstrap";
import GenerateModal from "../Generator";
import NewQuestionModal from "../NewQuestionModal";
import Question from "../Question";

const initialFormData = {
  name: "",
  amount: 3,
  category: "",
  difficulty: "",
  type: "",
};

const initialQuestion = {
  question: "",
  correct_answer: "",
  incorrect_answers: ["", "", ""],
};

const EditRound = () => {
  const [thisQuiz, setThisQuiz] = useState("");
  const [quizIndex, setQuizIndex] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionData, setQuestionData] = useState(initialQuestion);

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

  const handleShowQuestion = () => {
    setShowQuestion(true);
  };

  const handleShowGenerator = () => {
    setShowModal(true);
  };

  const fetchQuiz = async () => {
    const { amount, category, difficulty, type } = formData;
    const data = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    const jsonData = await data.json();
    console.log(jsonData.results);
    return jsonData;
  };

  const generateRound = async () => {
    const roundData = await fetchQuiz();
    return updateRoundData(roundData.results);
  };

  const updateRoundData = (quizData) => {
    if (!thisQuiz.questions) {
      const updateQuiz = {
        ...thisQuiz,
        questions: [...quizData],
      };
      return setThisQuiz(updateQuiz);
    }
    const updateQuiz = {
      ...thisQuiz,
      questions: [...quizData, ...thisQuiz.questions],
    };
    return setThisQuiz(updateQuiz);
  };

  const handelAddQuestion = () => {
    updateRoundData([questionData]);
    setQuestionData(initialQuestion);
  };

  const handleDelete = (q) => {
    const updatedQuestions = [...thisQuiz.questions];
    updatedQuestions.slice(q, 0);
    const updatedQuiz = {
      ...thisQuiz,
      questions: updatedQuestions,
    };
    setThisQuiz(updatedQuiz);
  };

  return (
    <>
      <NewQuestionModal
        showQuestion={showQuestion}
        setShowQuestion={setShowQuestion}
        questionData={questionData}
        setQuestionData={setQuestionData}
        addQuestion={handelAddQuestion}
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
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {thisQuiz.questions &&
            thisQuiz.questions.map((q, index) => {
              return (
                <Question
                  number={index}
                  q={q}
                  key={index}
                  handelDelete={handleDelete}
                />
              );
            })}
        </Col>
      </Row>
    </>
  );
};

export default EditRound;
