import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useObject } from "react-firebase-hooks/database";
import { useParams } from "react-router-dom";
import { useSelectedQuiz } from "../../context/SelectedQuizContext";
import Question from "../Question";
import { useUpdateCurrentAnswer } from "../../context/AnswersContext";
import { useUserLogin } from "../../context/UserContext";

const ShowQuiz = () => {
  // const [quizData, setQuizData] = useState("");
  const show = useSelectedQuiz();
  const clearAnswers = useUpdateCurrentAnswer();
  let { quizId } = useParams();
  const user = useUserLogin();
  const quizDBRef = firebase.database().ref(`quizzes/${user.uid}/${quizId}`);
  // const [value, loading, error] = useObject(quizDBRef);
  // console.log("snapshots", value.val());

  // snapshots.forEach((v) => {
  //   console.log(v.val());
  // });

  useEffect(() => {
    clearAnswers({}, true);
  }, []);

  return (
    <div>
      <h2>{show.title}</h2>
      <p>{quizId}</p>

      {show.quiz &&
        show.quiz.map((q, index) => {
          return <Question number={index} q={q} key={index} />;
        })}
    </div>
  );
};

export default ShowQuiz;
