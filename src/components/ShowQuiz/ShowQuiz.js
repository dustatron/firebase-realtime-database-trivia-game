import React from "react";
import { useSelectedQuiz } from "../../context/SelectedQuizContext";

const ShowQuiz = () => {
  const show = useSelectedQuiz();
  return (
    <div>
      <h2>Show Quiz</h2>
      {show.quiz &&
        show.quiz.map((q) => {
          return <p>{q.question.replace(/&#039;/g, "'")} </p>;
        })}
    </div>
  );
};

export default ShowQuiz;
