import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
// import { useSelectedQuiz } from "../../context/SelectedQuizContext";
import { useUserLogin } from "../../context/UserContext";
import { useUpdateCurrentAnswer } from "../../context/AnswersContext";
import { useUpdateQuizList, useQuizList } from "../../context/QuizListContext";
import { Card, Button, Row, Col } from "react-bootstrap";
import MakeRound from "../MakeRound";
import GenerateModal from "../Generator";

const initialFormData = {
  name: "",
  amount: 10,
  category: "",
  difficulty: "",
  type: "",
};

const ShowQuiz = () => {
  /* STATE */
  const [thisQuiz, setThisQuiz] = useState("");
  const [quizIndex, setQuizIndex] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [rounds, setRound] = useState([]);
  const [selectedRound, setSelectedRound] = useState(null);
  const [currentRound, setCurrentRound] = useState(null);

  /* QUIZ CONTEXT */
  const updateQuizList = useUpdateQuizList();
  const allQuizzes = useQuizList();

  const { quizKey } = useParams();
  const { uid } = useUserLogin();

  useEffect(() => {
    if (!thisQuiz || thisQuiz.key !== quizKey) {
      const currentQuiz = allQuizzes.find((q) => q.key === quizKey);
      setThisQuiz(currentQuiz);
      setQuizIndex(
        allQuizzes.findIndex((q) => {
          return q.key === quizKey;
        })
      );
    }
  }, [allQuizzes, quizKey, thisQuiz]);

  ///////////////////////////////////
  ////////// Functions /////////////
  /////////////////////////////////

  const writeToFirebase = (quizData) => {
    firebase
      .database()
      .ref("quizzes/" + uid + "/" + quizKey)
      .set(quizData, (error) => {
        if (error) {
          console.error("firebase write failed.", error.message);
        } else {
          // Data saved successfully!
          console.log("firebase wire success");
        }
      });
  };

  const handleAddRound = () => {
    let newQuizData = [...allQuizzes];

    // append a new round
    if (thisQuiz.rounds) {
      const count = thisQuiz.rounds.length + 1;
      const addRound = [{ title: `Round ${count}` }];
      const newRoundData = { rounds: [...thisQuiz.rounds, ...addRound] };
      const dataForFB = {
        ...thisQuiz,
        ...newRoundData,
      };
      newQuizData[quizIndex] = dataForFB;
      writeToFirebase(dataForFB);
      setThisQuiz(dataForFB);
    }

    // Create round object
    if (!thisQuiz.rounds) {
      const newRound = [{ title: "Round 1" }];
      newQuizData[quizIndex].rounds = [newRound];
      const dataForFB = { ...thisQuiz, rounds: [...newRound] };
      writeToFirebase(dataForFB);
      setThisQuiz(dataForFB);
    }

    // write to local context state.
    return updateQuizList(newQuizData);
  };

  const fetchQuiz = async () => {
    const { amount, category, difficulty, type } = formData;
    const data = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    const jsonData = await data.json();
    console.log(jsonData.results);
    return jsonData;
  };

  const onShowModal = (roundNumb) => {
    setShowModal(true);
    setSelectedRound(roundNumb);
  };

  const generateRound = async () => {
    const roundData = await fetchQuiz();
    return updateRoundData(roundData);
  };

  const updateRoundData = (roundData) => {
    let newQuizData = [...allQuizzes];
    const current = newQuizData[quizIndex].rounds[selectedRound];
    const newRoundData = { ...current, ...roundData };
    setRound(newRoundData);
    newQuizData[quizIndex].rounds[selectedRound] = newRoundData;

    // Update firebase
    const dataForFB = {
      ...thisQuiz,
      rounds: { ...thisQuiz.rounds, [selectedRound]: newRoundData },
    };
    writeToFirebase(dataForFB);

    // Update context state
    return updateQuizList(newQuizData);
  };

  const handelDeleteRound = (num) => {
    let newQuizData = [...allQuizzes];
    const removeRounds = allQuizzes[quizIndex].rounds.filter((round, index) => {
      if (round && index !== parseInt(num)) {
        return round;
      }
      return false;
    });
    newQuizData[quizIndex].rounds = [...removeRounds];
    console.log(thisQuiz.rounds);

    // Update firebase
    const dataForFB = {
      ...thisQuiz,
      rounds: { ...removeRounds },
    };

    writeToFirebase(dataForFB);

    const currentQuiz = allQuizzes.find((q) => q.key === quizKey);
    setThisQuiz(currentQuiz);

    // Update context state
    return updateQuizList(newQuizData);
  };

  return (
    <>
      {/* //////////////////////////////////
      ///////// QUIZ GENERATOR ////////
      //////////////////////////////// */}
      <GenerateModal
        show={showModal}
        setShow={setShowModal}
        getQuestions={generateRound}
        formData={formData}
        setFormData={setFormData}
        currentRound={currentRound}
      />

      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h2> {thisQuiz.title} </h2>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Card>
            <Card.Body>
              <Button variant="info" onClick={handleAddRound}>
                Add Round
              </Button>
              {thisQuiz.rounds &&
                Object.keys(thisQuiz.rounds).map((r, index) => (
                  <Button key={`round-btn-${index}`}>{index + 1}</Button>
                ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {thisQuiz.rounds &&
            Object.keys(thisQuiz.rounds).map((numb, index) => {
              const quiz = thisQuiz.rounds[numb];
              return (
                <MakeRound
                  key={`round${numb}-q${index}`}
                  RoundTitle={quiz.title}
                  showModal={() => {
                    onShowModal(numb);
                  }}
                  roundQuestions={quiz.results}
                  deleteRound={() => handelDeleteRound(index)}
                />
              );
            })}
        </Col>
      </Row>
    </>
  );
};

export default ShowQuiz;
