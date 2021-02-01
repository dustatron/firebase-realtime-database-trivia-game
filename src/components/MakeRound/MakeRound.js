import React from "react";
import { Card, Button } from "react-bootstrap";

const MakeRound = ({ RoundNumber, showModal }) => {
  return (
    <Card>
      <Card.Header> Round {RoundNumber}</Card.Header>
      <Card.Body>
        <Button onClick={showModal}> Show </Button>
      </Card.Body>
    </Card>
  );
};

export default MakeRound;
