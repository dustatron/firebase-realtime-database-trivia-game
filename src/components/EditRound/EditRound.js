import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase";
import { useParams } from "react-router-dom";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import {
  globalStateContext,
  globalDispatchContext,
} from "../../context/GlobalContext";
import {
  TOGGLE_GENERATE_MODAL,
  TOGGLE_CUSTOM_MODAL,
  SET_CURRENT_QUIZ,
  SET_QUIZ_INDEX,
  UPDATE_CURRENT_AND_FULL,
} from "../../context/constants";
import initial from "./initialState";
import { fetchQuizApi } from "../../utils/fetchApi";
import GenerateModal from "../GeneratorModal/GenerateModal";
import NewQuestionModal from "../NewQuestionModal";
import Question from "../Question";

const resetFormState = () => {
  return initial.question;
};

const EditRound = () => {
  const { quizKey } = useParams();
  const dispatch = useContext(globalDispatchContext);
  const {
    uid,
    isGenerateModalShowing,
    isCustomQuestionModalShowing,
    currentQuiz,
    fullQuizList,
    currentQuizIndex,
  } = useContext(globalStateContext);

  const [formData, setFormData] = useState(initial.formData);
  const [questionData, setQuestionData] = useState(initial.question);
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);

  useEffect(() => {
    if (!currentQuiz || currentQuiz.key !== quizKey) {
      const currentQuiz = fullQuizList.find((q) => q.key === quizKey);
      dispatch({ type: SET_CURRENT_QUIZ, payload: currentQuiz });
      const index = fullQuizList.findIndex((q) => {
        return q.key === quizKey;
      });
      dispatch({ type: SET_QUIZ_INDEX, payload: index });
    }
  }, [fullQuizList, quizKey, currentQuiz, dispatch]);

  const writeToFirebase = (quizData) => {
    firebase
      .database()
      .ref("quizzes/" + uid + "/" + quizKey)
      .set(quizData, (error) => {
        if (error) {
          console.error("firebase write failed.", error.message);
        }
      });
  };

  const updateRoundData = (quizData) => {
    const hasCurrentQuestions = !currentQuiz.questions
      ? []
      : currentQuiz.questions;

    const updateQuiz = {
      ...currentQuiz,
      questions: [...quizData, ...hasCurrentQuestions],
    };

    let newQuizData = [...fullQuizList];
    newQuizData[currentQuizIndex] = updateQuiz;

    writeToFirebase(updateQuiz);
    dispatch({
      type: UPDATE_CURRENT_AND_FULL,
      payload: { current: updateQuiz, full: [...newQuizData] },
    });
  };

  const generateQuestions = async () => {
    const roundData = await fetchQuizApi(setIsShowingSpinner, formData);
    updateRoundData(roundData.results);
  };

  /* Handle Things */
  const toggleGenerateModal = () => {
    dispatch({ type: TOGGLE_GENERATE_MODAL });
  };

  const toggleCustomQuestionModal = () => {
    dispatch({ type: TOGGLE_CUSTOM_MODAL });
  };

  const handelAddQuestion = () => {
    updateRoundData([questionData]);
    setQuestionData(resetFormState());
  };

  const handleDelete = (q) => {
    const updatedQuestions = [...currentQuiz.questions];
    updatedQuestions.splice(parseInt(q), 1);

    const updateQuiz = {
      ...currentQuiz,
      questions: [...updatedQuestions],
    };

    let newQuizData = [...fullQuizList];
    newQuizData[currentQuizIndex] = updateQuiz;

    writeToFirebase(updateQuiz);
    dispatch({
      type: UPDATE_CURRENT_AND_FULL,
      payload: { current: updateQuiz, full: [...newQuizData] },
    });
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
              <Button variant="info" onClick={toggleGenerateModal}>
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
