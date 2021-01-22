/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { ListGroup, Button } from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
import {
  useSelectedQuizUpdate,
  useSelectedQuiz,
} from "../../context/SelectedQuizContext";
import ConfirmModel from "./ConfirmModal";
import "./menu.css";

const Menu = ({ updater }) => {
  const auth = firebase.auth();
  const [UID, setUID] = useState(0);
  const dbRef = firebase.database().ref("quizzes/" + UID);
  useEffect(() => {
    if (auth.currentUser) {
      setUID(auth.currentUser.uid);
    }
  }, [auth.currentUser]);

  const updateSelected = useSelectedQuizUpdate();
  const selectedQuiz = useSelectedQuiz();
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(false);

  const [quizzes, loading, error] = useList(dbRef);

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
        {loading && "Loading..."}
        {!loading &&
          quizzes &&
          quizzes.map((q) => {
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
