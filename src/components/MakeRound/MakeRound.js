import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Question from "../Question";

const MakeRound = ({ RoundTitle, showModal, roundQuestions, deleteRound }) => {
  const [isShowing, setIsShowing] = useState(true);
  return (
    <div className="make-round">
      <Card>
        <Card.Header> {RoundTitle} </Card.Header>
        <Button
          onClick={() => {
            setIsShowing(!isShowing);
          }}
        >
          {isShowing ? "Hide" : "Show"}
        </Button>
        <Button onClick={deleteRound}> Delete </Button>
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
    </div>
  );
};

export default MakeRound;
