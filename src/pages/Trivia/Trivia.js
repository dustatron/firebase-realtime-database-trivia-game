import { Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import Menu from "../../components/Menu";
import Generator from "../../components/Generator";
import ShowQuiz from "../../components/ShowQuiz";
import ShowAnswers from "../../components/ShowAnswers";
import MakeQuiz from "../../components/MakeQuiz";

const Trivia = () => {
  const [view, updateView] = useState(1);

  return (
    <>
      <Row>
        <Col sm={2}>
          <Menu updater={updateView} />
        </Col>
        <Col sm={10}>
          {view === 0 && <MakeQuiz />}
          {view === 1 && <Generator />}
          {view === 2 && <ShowQuiz />}
          {view === 3 && <ShowAnswers />}
        </Col>
      </Row>
    </>
  );
};

export default Trivia;
