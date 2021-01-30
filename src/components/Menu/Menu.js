/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
import { useUpdateQuizList, useQuizList } from "../../context/QuizListContext";

import {
  useSelectedQuizUpdate,
  useSelectedQuiz,
} from "../../context/SelectedQuizContext";
import { useUserLogin } from "../../context/UserContext";
import ConfirmModel from "./ConfirmModal";

import "./menu.css";

const Menu = ({ updater }) => {
  const user = useUserLogin();
  const updateSelected = useSelectedQuizUpdate();
  const selectedQuiz = useSelectedQuiz();

  const dbRef = firebase.database().ref("quizzes/" + user.uid);

  const updateQuizList = useUpdateQuizList();
  const quizList = useQuizList();

  const [show, setShow] = useState(false);
  const [quizzes, loading, error] = useList(dbRef);
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    if (quizzes.length !== quizList.length) {
      return updateQuizList(quizzes);
    }
  }, [quizzes]); // set when opening modal

  const handleDelete = () => {
    setShow(false);
    return dbRef.child(current.key).remove();
  };

  const showModal = (q) => {
    setCurrent(q);
    setShow(true);
  };

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
        <ListGroup.Item
          variant={selectedQuiz.title === "Generator" ? "success" : ""}
          onClick={() => {
            updater(1);
            updateSelected({ title: "Generator" });
          }}
        >
          Generator
        </ListGroup.Item>

        {error && `Error: ${error}`}
        {quizList &&
          quizList.map((q) => {
            const quiz = q.val();
            return (
              <ListGroup.Item
                variant={selectedQuiz.title === quiz.title ? "success" : ""}
                className="menu-item"
                key={q.key}
                onClick={() => {
                  const selectData = { ...quiz, key: q.key };
                  updater(2);
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
            );
          })}
        {loading && <Spinner animation="border" />}
      </ListGroup>
      <Button
        onClick={() => {
          updater(3);
          updateSelected({});
        }}
      >
        Get Answers
      </Button>
    </div>
  );
};

export default Menu;
