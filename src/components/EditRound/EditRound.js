import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useParams } from "react-router-dom";
import { useQuizList } from "../../context/QuizListContext";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { useUserLogin } from "../../context/UserContext";
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
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);

  const allQuizzes = useQuizList();
  const { quizKey } = useParams();
  const { uid } = useUserLogin();

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

  const writeToFirebase = (quizData) => {
    firebase
      .database()
      .ref("quizzes/" + uid + "/" + quizKey)
      .set(quizData, (error) => {
        if (error) {
          console.error("firebase write failed.", error.message);
        } else {
          // Data saved successfully!
          console.log("firebase wire success");
        }
      });
  };

  const updateRoundData = (quizData) => {
    let newQuizData = [...allQuizzes];

    if (!thisQuiz.questions) {
      const updateQuiz = {
        ...thisQuiz,
        questions: [...quizData],
      };
      newQuizData[quizIndex].questions = [...quizData];
      writeToFirebase(updateQuiz);
      return setThisQuiz(updateQuiz);
    }

    const updateQuiz = {
      ...thisQuiz,
      questions: [...quizData, ...thisQuiz.questions],
    };
    newQuizData[quizIndex].questions = [...quizData, ...thisQuiz.questions];
    writeToFirebase(updateQuiz);
    setThisQuiz(updateQuiz);
  };

  const fetchQuiz = async () => {
    setIsShowingSpinner(true);
    const { amount, category, difficulty, type } = formData;
    const data = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    const jsonData = await data.json();
    setIsShowingSpinner(false);
    return jsonData;
  };

  const deleteRoundData = (questions) => {
    let newQuizData = [...allQuizzes];
    newQuizData[quizIndex].questions = [...questions];

    const updateQuiz = {
      ...thisQuiz,
      questions: [...questions],
    };

    writeToFirebase(updateQuiz);
    setThisQuiz(updateQuiz);
  };

  const generateQuestions = async () => {
    const roundData = await fetchQuiz();
    return updateRoundData(roundData.results);
  };

  /* Handle Things */

  const handleShowQuestion = () => {
    setShowQuestion(true);
  };

  const handleShowGenerator = () => {
    setShowModal(true);
  };

  const handelAddQuestion = () => {
    updateRoundData([questionData]);
    setQuestionData(initialQuestion);
  };

  const handleDelete = (q) => {
    const updatedQuestions = [...thisQuiz.questions];
    updatedQuestions.splice(parseInt(q), 1);
    // const updatedQuiz = {
    //   ...thisQuiz,
    //   questions: updatedQuestions,
    // };
    deleteRoundData(updatedQuestions);
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
        getQuestions={generateQuestions}
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
          {isShowingSpinner && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
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
