import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Question from "../Question";

const MakeRound = ({ RoundNumber, showModal, roundQuestions }) => {
  const [isShowing, setIsShowing] = useState(true);
  return (
    <Card>
      <Card.Header> Round {RoundNumber}</Card.Header>
      <Button
        onClick={() => {
          setIsShowing(!isShowing);
        }}
      >
        {isShowing ? "Hide" : "Show"}
      </Button>
      <Card.Body>
        {isShowing && (
          <>
            <Button onClick={showModal}> Generate </Button>

            <hr />
            {roundQuestions &&
              roundQuestions.map((question, index) => {
                return <Question number={index} q={question} key={index} />;
              })}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default MakeRound;
