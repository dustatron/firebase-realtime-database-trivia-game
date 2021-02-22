import React, { useContext } from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { useRouteMatch, Link } from "react-router-dom";
import { globalDispatchContext } from "../../context/GlobalContext";
import { SET_CURRENT_QUIZ } from "../../context/constants";
import ConfirmModel from "./ConfirmModal";

import "./menu.css";

const Menu = ({
  handleDelete,
  show,
  setShow,
  current,
  currentQuiz,
  quizzes,
  loading,
  showModal,
}) => {
  let { url } = useRouteMatch();
  const dispatch = useContext(globalDispatchContext);

  return (
    <div>
      <ConfirmModel
        del={handleDelete}
        show={show}
        setShow={setShow}
        quiz={current}
      />
      <h2>Menu</h2>
      <ListGroup>
        <Link to={`${url}/create`}>
          <ListGroup.Item
            variant={
              currentQuiz && currentQuiz.title === "create" ? "success" : ""
            }
            onClick={() => {
              dispatch({
                type: SET_CURRENT_QUIZ,
                payload: { title: "create" },
              });
            }}
          >
            Create Round
          </ListGroup.Item>
        </Link>

        {/* {error && `Error: ${error}`} */}
        {quizzes &&
          quizzes.map((q) => {
            const quiz = q.val();
            return (
              <Link
                to={`${url}/edit-round/${q.key}`}
                key={q.key}
                onClick={() => {
                  dispatch({ title: SET_CURRENT_QUIZ, payload: q });
                }}
              >
                <ListGroup.Item
                  className="menu-item"
                  variant={
                    currentQuiz && currentQuiz.key === q.key ? "success" : ""
                  }
                >
                  {quiz.title}
                  <button
                    className="menu-delete"
                    onClick={() => {
                      showModal(q);
                    }}
                  >
                    🗑
                  </button>
                </ListGroup.Item>
              </Link>
            );
          })}
        {loading && <Spinner animation="border" />}
      </ListGroup>
      <Link to={`${url}/make-quiz`}>
        <Button
          variant={currentQuiz && currentQuiz.title === "make" ? "success" : ""}
        >
          Make Quiz
        </Button>
      </Link>
    </div>
  );
};

export default Menu;
