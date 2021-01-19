import React, { useEffect } from "react";
import { useSelectedQuiz } from "../../context/SelectedQuizContext";
import Question from "../Question";
import { useUpdateCurrentAnswer } from "../../context/AnswersContext";

const ShowQuiz = () => {
  const show = useSelectedQuiz();
  const clearAnswers = useUpdateCurrentAnswer();

  useEffect(() => {
    clearAnswers({}, true);
  }, []);

  return (
    <div>
      <h2>Show Quiz</h2>
      {show.quiz &&
        show.quiz.map((q, index) => {
          return <Question number={index} q={q} key={index} />;
        })}
    </div>
  );
};

export default ShowQuiz;
