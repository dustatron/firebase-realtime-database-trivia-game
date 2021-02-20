import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useUserLogin } from "../../context/UserContext";
import {
  useSelectedQuizUpdate,
  useSelectedQuiz,
} from "../../context/SelectedQuizContext";
import { useList } from "react-firebase-hooks/database";
import { useUpdateQuizList, useQuizList } from "../../context/QuizListContext";
import firebase from "firebase";
import Menu from "../../components/Menu";
import EditRound from "../../components/EditRound";
import CreateRound from "../../components/CreateRound";
import MakeQuiz from "../../components/MakeQuiz";

const Trivia = () => {
  let { path } = useRouteMatch();
  const user = useUserLogin();
  const dbRef = firebase.database().ref("quizzes/" + user.uid);

  const updateSelected = useSelectedQuizUpdate();

  const selectedQuiz = useSelectedQuiz();

  const updateQuizList = useUpdateQuizList();
  const quizList = useQuizList();

  const [show, setShow] = useState(false);

  const [quizzes, loading, error] = useList(dbRef);
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    if (quizzes.length !== quizList.length) {
      const quizList = quizzes.map((q) => {
        return { ...q.val(), key: q.key };
      });
      return updateQuizList(quizList);
    }
  }, [quizzes, quizList, updateQuizList]);

  const handleDelete = () => {
    setShow(false);
    return dbRef.child(current.key).remove();
  };

  const showModal = (q) => {
    setCurrent(q);
    setShow(true);
  };

  return (
    <>
      <Row>
        <Col sm={2}>
          <Menu
            handleDelete={handleDelete}
            show={show}
            setShow={setShow}
            current={current}
            updateSelected={updateSelected}
            selectedQuiz={selectedQuiz}
            quizzes={quizzes}
            loading={loading}
            showModal={showModal}
          />
        </Col>
        <Col sm={10}>
          <Switch>
            <Route exact path={path}>
              <h2>Trivia Making made easy</h2>
            </Route>
            <Route path={`${path}/create`}>
              <CreateRound />
            </Route>
            <Route path={`${path}/edit-round/:quizKey`}>
              <EditRound />
            </Route>
            <Route path={`${path}/make-quiz`}>
              <MakeQuiz />
            </Route>
          </Switch>
        </Col>
      </Row>
    </>
  );
};

export default Trivia;
