import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";
import { Card, Button } from "react-bootstrap";

import { useUpdateCurrentAnswer } from "../../context/AnswersContext";
import { clean } from "../../helper";

import "./question.css";

const Question = ({
  number,
  q: { question, correct_answer, incorrect_answers },
}) => {
  const addAnswer = useUpdateCurrentAnswer();
  const [answer, setAnswer] = useState("");
  const [display, setDisplay] = useState([]);
  const [isShowingAnswers, setShowingAnswers] = useState(false);

  useEffect(() => {
    const options = [correct_answer, ...incorrect_answers];
    setDisplay(shuffle(options));
  }, [correct_answer, incorrect_answers]);

  const handleAnswerClick = (q) => {
    const answerState = {
      [number]: {
        question: question,
        correct: correct_answer,
        selected: q,
      },
    };
    addAnswer(answerState);
    setAnswer(q);
  };
  const handleShowAnswer = () => {
    setShowingAnswers(!isShowingAnswers);
  };

  return (
    <Card className="question-card">
      <Card.Header>
        <h3>{clean(question)}</h3>
        <Button
          onClick={handleShowAnswer}
          variant={isShowingAnswers ? "info" : "secondary"}
        >
          {isShowingAnswers ? "Hide Answer" : "Show Answer"}
        </Button>
        {/* // TODO: Make button delete question */}
        <Button>🗑</Button>
      </Card.Header>
      <Card.Body>
        {/* <p>{clean(correct_answer)}</p> */}
        <div className="question-options">
          {display.map((q, index) => (
            <Button
              key={`${q[0]}-${index}`}
              className="question-options-btn"
              size="lg"
              onClick={(e) => {
                handleAnswerClick(q);
              }}
              variant={
                q === correct_answer && isShowingAnswers ? "info" : "secondary"
              }
            >
              {clean(q)}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Question;
