import React from "react";
import _ from "lodash";

const Question = ({ q: { question, correct_answer, incorrect_answers } }) => {
  const options = [correct_answer, ...incorrect_answers];
  return (
    <div>
      <h2>{question}</h2>
      <p>{correct_answer}</p>
      <ol>
        {_.shuffle(options).map((q) => (
          <li> {q} </li>
        ))}
      </ol>
    </div>
  );
};

export default Question;
