import React, { useState } from "react";
import Menu from "./Menu";
import Generator from "./Generator";
import { Col, Row } from "react-bootstrap";
import ShowQuiz from "../ShowQuiz";

const Trivia = () => {
  const [view, updateView] = useState(1);
  return (
    <>
      <Row>
        <Col sm={2}>
          <Menu updater={updateView} />
        </Col>
        <Col sm={10}>
          {view === 1 && <Generator />}
          {view === 2 && <ShowQuiz />}
        </Col>
      </Row>
    </>
  );
};

export default Trivia;
