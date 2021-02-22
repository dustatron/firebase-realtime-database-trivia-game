import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase";
import { useParams } from "react-router-dom";
import { useQuizList } from "../../context/QuizListContext";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
// import { useUserLogin } from "../../context/UserContext";
import {
  globalStateContext,
  globalDispatchContext,
} from "../../context/GlobalContext";
import {
  TOGGLE_GENERATE_MODAL,
  TOGGLE_CUSTOM_MODAL,
  SET_CURRENT_QUIZ,
} from "../../context/constants";
import initial from "./initialState";
import GenerateModal from "../GeneratorModal/GenerateModal";
import NewQuestionModal from "../NewQuestionModal";
import Question from "../Question";

const EditRound = () => {
  // GLOBAL STATE
  const {
    uid,
    isGenerateModalShowing,
    isCustomQuestionModalShowing,
    currentQuiz,
    fullQuizList,
  } = useContext(globalStateContext);

  const dispatch = useContext(globalDispatchContext);

  const [quizIndex, setQuizIndex] = useState("");
  const [formData, setFormData] = useState(initial.formData);
  const [questionData, setQuestionData] = useState(initial.question);
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);

  const { quizKey } = useParams();

  useEffect(() => {
    if (!currentQuiz || currentQuiz.key !== quizKey) {
      const currentQuiz = fullQuizList.find((q) => q.key === quizKey);
      dispatch({ type: SET_CURRENT_QUIZ, payload: currentQuiz });
      setQuizIndex(
        fullQuizList.findIndex((q) => {
          return q.key === quizKey;
        })
      );
    }
  }, [fullQuizList, quizKey, currentQuiz, dispatch]);

  const toggleGenerateModal = () => {
    dispatch({ type: TOGGLE_GENERATE_MODAL });
  };

  const toggleCustomQuestionModal = () => {
    dispatch({ type: TOGGLE_CUSTOM_MODAL });
  };

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
    let newQuizData = [...fullQuizList];

    if (!currentQuiz.questions) {
      const updateQuiz = {
        ...currentQuiz,
        questions: [...quizData],
      };
      newQuizData[quizIndex].questions = [...quizData];
      writeToFirebase(updateQuiz);
      dispatch({ type: SET_CURRENT_QUIZ, payload: updateQuiz });
    }

    const updateQuiz = {
      ...currentQuiz,
      questions: [...quizData, ...currentQuiz.questions],
    };
    newQuizData[quizIndex].questions = [...quizData, ...currentQuiz.questions];
    writeToFirebase(updateQuiz);
    dispatch({ type: SET_CURRENT_QUIZ, payload: updateQuiz });
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
    let newQuizData = [...fullQuizList];
    newQuizData[quizIndex].questions = [...questions];

    const updateQuiz = {
      ...currentQuiz,
      questions: [...questions],
    };

    writeToFirebase(updateQuiz);
    dispatch({ type: SET_CURRENT_QUIZ, payload: updateQuiz });
  };

  const generateQuestions = async () => {
    const roundData = await fetchQuiz();
    return updateRoundData(roundData.results);
  };

  /* Handle Things */
  const handleShowGenerator = () => {
    toggleGenerateModal(true);
  };

  const handelAddQuestion = () => {
    updateRoundData([questionData]);
    setQuestionData(initial.question);
  };

  const handleDelete = (q) => {
    const updatedQuestions = [...currentQuiz.questions];
    updatedQuestions.splice(parseInt(q), 1);
    deleteRoundData(updatedQuestions);
  };

  return (
    <>
      <NewQuestionModal
        showQuestion={isCustomQuestionModalShowing}
        setShowQuestion={toggleCustomQuestionModal}
        questionData={questionData}
        setQuestionData={setQuestionData}
        addQuestion={handelAddQuestion}
      />

      <GenerateModal
        show={isGenerateModalShowing}
        setShow={toggleGenerateModal}
        getQuestions={generateQuestions}
        formData={formData}
        setFormData={setFormData}
      />

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Header>
              <h2 className="text-center">
                "{currentQuiz && currentQuiz.title}"
              </h2>
            </Card.Header>
            <Card.Body className="text-center">
              <Button variant="warning" onClick={toggleCustomQuestionModal}>
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
          {currentQuiz.questions &&
            currentQuiz.questions.map((q, index) => {
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
