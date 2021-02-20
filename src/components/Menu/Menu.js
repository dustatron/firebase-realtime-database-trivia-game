import React from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { useRouteMatch, Link } from "react-router-dom";
import ConfirmModel from "./ConfirmModal";

import "./menu.css";

const Menu = ({
  handleDelete,
  show,
  setShow,
  current,
  updateSelected,
  selectedQuiz,
  quizzes,
  loading,
  showModal,
}) => {
  let { url } = useRouteMatch();

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
            variant={selectedQuiz.title === "create" ? "success" : ""}
            onClick={() => {
              updateSelected({ title: "create" });
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
              <Link to={`${url}/edit-round/${q.key}`} key={q.key}>
                <ListGroup.Item
                  className="menu-item"
                  variant={selectedQuiz.key === q.key ? "success" : ""}
                  onClick={() => {
                    const selectData = { ...quiz, key: q.key };
                    updateSelected(selectData);
                  }}
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
        <Button>Make Quiz</Button>
      </Link>
    </div>
  );
};

export default Menu;
