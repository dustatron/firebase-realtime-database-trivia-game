import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
import {
  globalStateContext,
  globalDispatchContext,
} from "../../context/GlobalContext";
import { SET_FULL_QUIZ_LIST, SET_CURRENT_QUIZ } from "../../context/constants";
import Menu from "../../components/Menu";
import EditRound from "../../components/EditRound";
import CreateRound from "../../components/CreateRound";
import MakeQuiz from "../../components/MakeQuiz";

const Trivia = () => {
  const { uid, currentQuiz, fullQuizList } = useContext(globalStateContext);
  const dispatch = useContext(globalDispatchContext);
  const dbRef = firebase.database().ref("quizzes/" + uid);
  const { path } = useRouteMatch();
  const history = useHistory();

  const [isShowing, setIsShowing] = useState(false);

  /* Grabs list from Firebase */
  const [quizzes, loading] = useList(dbRef);

  useEffect(() => {
    if (quizzes.length !== fullQuizList.length) {
      const quizList = quizzes.map((q) => {
        return { ...q.val(), key: q.key };
      });
      dispatch({ type: SET_FULL_QUIZ_LIST, payload: quizList });
    }
  }, [fullQuizList, dispatch, quizzes]);

  const handleDelete = () => {
    setIsShowing(false);
    dbRef.child(currentQuiz.key).remove();
    dispatch({ type: SET_CURRENT_QUIZ, payload: {} });
    history.push("/trivia/create");
  };

  return (
    <>
      <Row>
        <Col sm={2}>
          <Menu
            handleDelete={handleDelete}
            show={isShowing}
            setShow={setIsShowing}
            currentQuiz={currentQuiz}
            quizzes={quizzes}
            loading={loading}
          />
        </Col>
        <Col sm={10}>
          <Switch>
            <Route exact path={path}>
              <MakeQuiz />
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
