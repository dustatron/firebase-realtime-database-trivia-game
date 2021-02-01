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
  const [round, setRound] = useState([]);

  const fetchQuiz = async () => {
    const { amount, category, difficulty, type } = formData;
    const data = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    const jsonData = data.json();
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
    console.log("submit");
  };

  const handleAddRound = () => {
    const newRound = [...round, round.length + 1];
    setRound(newRound);
  };

  return (
    <>
      <GenerateModal
        show={showModal}
        setShow={setShowModal}
        refetch={refetch}
        formData={formData}
        setFormData={setFormData}
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
                <InputGroup className="mb-3">
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
                </InputGroup>
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
                {round.map((r, index) => (
                  <Button key={`round-btn-${index}`}>{r}</Button>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {isLoading && <span>Loading...</span>}
          {isError && <span>Error: {error.message}</span>}
          {/* {data &&
            data.results.map((que, index) => {
              return <Question number={index} q={que} key={index} />;
            })} */}
          {round.map((r, index) => (
            <>
              <MakeRound
                key={`round-${index}`}
                RoundNumber={r}
                data={data ? data.results : null}
                showModal={setShowModal}
              />
            </>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MakeQuiz;
