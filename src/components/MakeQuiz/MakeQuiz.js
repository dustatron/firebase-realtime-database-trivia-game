import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useQuery } from "react-query";
import GenerateModal from "./GenerateModal";
import Question from "../Question";
import MakeRound from "../MakeRound";
import { currentAnswerContext } from "../../context/AnswersContext";
// import SaveButton from "./SaveButton";

const initialFormData = {
  name: "",
  amount: 10,
  category: "",
  difficulty: "",
  type: "",
};

const MakeQuiz = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);
  const [currentRound, setCurrentRound] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);
  const [rounds, setRound] = useState([]);

  const fetchQuiz = async () => {
    const { amount, category, difficulty, type } = formData;
    const data = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    const jsonData = await data.json();
    console.log(jsonData.results);
    return jsonData;
  };

  const { isLoading, isError, data, error, refetch } = useQuery(
    "quiz",
    fetchQuiz,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const handleSave = (e) => {
    e.preventDefault();
  };

  const handleAddRound = () => {
    if (currentRound === null) {
      setCurrentRound(0);
      return setRound({ 0: {} });
    }
    const newRound = currentRound + 1;
    setCurrentRound(newRound);
    setRound({ ...rounds, [newRound]: {} });
  };

  const onShowModal = (r) => {
    setShowModal(true);
    setSelectedRound(r);
  };

  const generateRound = async () => {
    // refetch();
    const roundData = await fetchQuiz();
    const newRoundData = { ...rounds, [selectedRound]: roundData };
    setRound(newRoundData);
  };

  return (
    <>
      <GenerateModal
        show={showModal}
        setShow={setShowModal}
        getQuestions={generateRound}
        formData={formData}
        setFormData={setFormData}
        currentRound={currentRound}
      />
      {/* 
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        show modal
      </Button> */}

      <Container style={{ paddingTop: "2em", marginBottom: "3em" }}>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Card>
              <Card.Header>Quiz Name</Card.Header>
              <Card.Body>
                {/* <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Quiz Name"
                    aria-label="Name your Quiz"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <Button onClick={handleSave} variant="outline-secondary">
                      Save
                    </Button>
                  </InputGroup.Append>
                </InputGroup> */}
              </Card.Body>
            </Card>
            {/* {data && <SaveButton quiz={data.results} fetch={refetch} />} */}
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Card>
              <Card.Body>
                <Button variant="info" onClick={handleAddRound}>
                  Add Round
                </Button>
                {Object.keys(rounds).map((r, index) => (
                  <Button key={`round-btn-${index}`}>{index + 1}</Button>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            {/* {isLoading && <span>Loading...</span>}
            {isError && <span>Error: {error.message}</span>} */}
            {/* {data &&
            data.results.map((que, index) => {
              return <Question number={index} q={que} key={index} />;
            })} */}
            {Object.keys(rounds).map((r) => (
              <MakeRound
                key={`round-${r + 1}`}
                RoundNumber={r}
                showModal={() => {
                  onShowModal(r);
                }}
                roundQuestions={rounds[r].results}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MakeQuiz;
