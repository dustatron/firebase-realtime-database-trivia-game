/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import firebase from "firebase";
import { ListGroup, Button } from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
import { useSelectedQuizUpdate } from "../../context/SelectedQuizContext";

const Menu = ({ updater }) => {
  const dbRef = firebase.database().ref("quizs");
  const updateSelected = useSelectedQuizUpdate();

  const [quizs, loading, error] = useList(dbRef);

  return (
    <div>
      <h2>Menu</h2>
      <ListGroup>
        <ListGroup.Item
          onClick={() => {
            updater(1);
          }}
        >
          Generator
        </ListGroup.Item>
        {error && `Error: ${error}`}
        {loading && "Loading..."}
        {!loading &&
          quizs &&
          quizs.map((q) => {
            const quiz = q.val();
            return (
              <ListGroup.Item
                key={q.key}
                onClick={() => {
                  const selectData = { ...quiz, key: q.key };
                  updater(2);
                  updateSelected(selectData);
                }}
              >
                {quiz.title}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
      <Button
        onClick={() => {
          updater(3);
        }}
      >
        Get Answers
      </Button>
    </div>
  );
};

export default Menu;
