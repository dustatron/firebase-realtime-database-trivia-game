import React, { useState, useEffect } from "react";
import { useCurrentAnswer } from "../../context/AnswersContext";
import { clean } from "../../helper";

const ShowAnswers = () => {
  const answersObj = useCurrentAnswer();
  const answersList = Object.values(answersObj);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let total = 0;
    answersList.forEach((q) => {
      if (q.correct === q.selected) {
        total++;
      }
    });
    setScore(total);
  }, [answersList]);

  return (
    <div>
      <h2>Answers</h2>
      <div> TOTAL SCORE: {score}</div>
      <div>
        {answersList.map((ans, index) => {
          return (
            <div key={`${ans[0]}-${index}`}>
              <h4> {clean(ans.question)} </h4>
              <div>
                {ans.correct === ans.selected ? (
                  <> "Correct:" {clean(ans.correct)} </>
                ) : (
                  <>
                    <p>WRONG</p>
                    <p>The answer was: {clean(ans.correct)}</p>
                    <p>You guessed: {clean(ans.selected)}</p>
                  </>
                )}
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowAnswers;
