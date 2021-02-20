import React from "react";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import Question from "../Question";
import SaveTrivia from "./SaveTrivia";

const fetchQuiz = async () => {
  const data = await fetch("https://opentdb.com/api.php?amount=10");
  const jsonData = data.json();
  return jsonData;
};

const Generator = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "quiz",
    fetchQuiz,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (data)
    return (
      <div>
        <h2>Generator</h2>
        <SaveTrivia quiz={data.results} fetch={refetch} />
        {data.results.map((que, index) => {
          return <Question number={index} q={que} key={index} />;
        })}
      </div>
    );
  return (
    <div>
      {" "}
      <Button
        onClick={() => {
          refetch();
        }}
      >
        Fetch Quiz
      </Button>{" "}
    </div>
  );
};

export default Generator;
